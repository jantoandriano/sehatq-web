import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  getHCPList,
  hcpKeys,
  HCPListQuery,
  hcpSpecialityKeys,
  getSpecialityLink,
  getHCPSEO,
  HCPSEOQuery,
  myLocationKeys,
  translatedSlugKeys,
  getTranslatedSlug,
  validateHCPSSlugs,
} from "@sehatq/components";

export type HCPQuery = {
  q: string;
  page: string;
  perPage: string;
  gender: string;
  schedule: string;
  lat: string;
  long: string;
  sort: string;
  hcfId: string;
};

export type HCPParams = {
  slugs: string[];
};

export async function getHCPProps(
  arg: HCPParams & { isMobile: boolean } & HCPQuery
) {
  const {
    isMobile,
    slugs,
    page,
    perPage,
    gender,
    schedule,
    lat,
    long,
    sort,
    q,
    hcfId,
  } = arg;
  let error = null;
  let notFound = false;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();

  // Tell the search engines about old pathname has been gone. New pathname doesn't prefix.
  let gone = slugs.some((slug) =>
    ["c-", "d-", "lp-"].some((prefix) => slug.startsWith(prefix))
  );

  if (gone) {
    return {
      isMobile,
      notFound,
      gone,
      error,
    };
  }

  try {
    const slugQuery = {
      featureName: "dokter",
      slugs: slugs as string[],
    };

    let hcpSlugs;

    if (slugs.length > 0) {
      const slugsDetail = await queryClient.fetchQuery(
        translatedSlugKeys.detail(slugQuery),
        async () =>
          await getTranslatedSlug({
            fetch,
            query: slugQuery,
          })
      );
      hcpSlugs = slugsDetail.data;
    }

    const isValidSlugs = validateHCPSSlugs(slugs, hcpSlugs);

    notFound = !isValidSlugs.valid;

    const { citySlug, districtSlug, procedureId, specialitySlug } =
      isValidSlugs.slugs;

    // Tell the search engines about old pathname has been gone. New pathname doesn't contain district slug.
    gone = Boolean(districtSlug);

    if (gone) {
      return {
        isMobile,
        notFound,
        gone,
        error,
      };
    }

    const hcpListQuery: HCPListQuery = {
      page: page ?? "1",
      perPage: perPage ?? "9",
      userLat: lat,
      userLong: long,
      query: q,
      procedureId,
      scheduleDayId: schedule,
      citySlug,
      gender: gender,
      specialitySlug,
      sortBy: sort ?? "terdekat",
      hcfId: hcfId,
    };

    const contentSEOHcp: HCPSEOQuery = {
      specialitySlug: specialitySlug || "dokter",
    };

    if (lat && long) {
      queryClient.setQueryData(myLocationKeys.all, { lat, long });
    }

    const responses = await Promise.all([
      queryClient.fetchInfiniteQuery(
        hcpKeys.infiniteList(hcpListQuery),
        async () =>
          await getHCPList({
            fetch,
            query: hcpListQuery,
          })
      ),
      queryClient.prefetchQuery(
        hcpSpecialityKeys.lists(),
        async () => await getSpecialityLink()
      ),
      queryClient.prefetchQuery(
        hcpKeys.seo(contentSEOHcp),
        async () =>
          await getHCPSEO({
            fetch,
            query: contentSEOHcp,
          })
      ),
    ]);

    const hcpListResponse = responses[0];

    if (!hcpListResponse?.pages[0].data.length) {
      notFound = true;
    }
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    notFound,
    gone,
    error,
  };
}
