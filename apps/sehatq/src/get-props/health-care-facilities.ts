import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  getHCFList,
  hcfKeys,
  HCFListQuery,
  myLocationKeys,
  translatedSlugKeys,
  getTranslatedSlug,
  validateHCFSSlugs,
} from "@sehatq/components";

export type HCFQuery = {
  q: string;
  page: string;
  perPage: string;
  partner: string;
  facility: string;
  lat: string;
  long: string;
  sort: string;
};

export type HCFParams = {
  slugs: string[];
};

export async function getHCFProps(
  arg: HCFParams & { isMobile: boolean } & HCFQuery
) {
  const {
    isMobile,
    slugs,
    page,
    perPage,
    partner,
    facility,
    lat,
    long,
    sort,
    q,
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
      featureName: "faskes",
      slugs: slugs as string[],
    };

    let hcfSlugs;

    if (slugs.length > 0) {
      const slugsDetail = await queryClient.fetchQuery(
        translatedSlugKeys.detail(slugQuery),
        async () =>
          await getTranslatedSlug({
            fetch,
            query: slugQuery,
          })
      );
      hcfSlugs = slugsDetail.data;
    }

    const isValidSlugs = validateHCFSSlugs(slugs, hcfSlugs);

    notFound = !isValidSlugs.valid;

    const { citySlug, districtSlug, procedureId, hcfTypeSlug } =
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

    const hcfListQuery: HCFListQuery = {
      page: page ?? "1",
      perPage: perPage ?? "16",
      userLat: lat,
      userLong: long,
      sortBy: sort ?? "terdekat",
      partner,
      hcfTypeSlug,
      procedureId,
      medicalFacilityId: facility,
      query: q,
      citySlug,
    };

    if (lat && long) {
      queryClient.setQueryData(myLocationKeys.all, { lat, long });
    }

    const responses = await queryClient.fetchInfiniteQuery(
      hcfKeys.infiniteList(hcfListQuery),
      async () =>
        await getHCFList({
          fetch,
          query: hcfListQuery,
        })
    );

    if (!responses?.pages[0].data.length) {
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
