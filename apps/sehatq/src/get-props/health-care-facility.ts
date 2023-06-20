import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  hcfKeys,
  getHCFDetail,
  HCFDetailQuery,
  hcfServiceKeys,
  getHCFServices,
} from "@sehatq/components";

export type HCFDetailPageParams = {
  hcfSlug: string;
};

export async function getHCFDetailProps(
  arg: HCFDetailPageParams & { isMobile: boolean }
) {
  const { isMobile, hcfSlug } = arg;

  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;

  try {
    const hcfQuery: HCFDetailQuery = {
      hcfSlug,
      userLat: "",
      userLong: "",
    };

    await Promise.all([
      queryClient.fetchQuery(
        hcfKeys.detail(hcfQuery),
        async () =>
          await getHCFDetail({
            fetch,
            query: hcfQuery,
          })
      ),
      queryClient.prefetchQuery(
        hcfServiceKeys.list({
          hcfSlug,
        }),
        async () =>
          await getHCFServices({
            fetch,
            query: { hcfSlug },
          })
      ),
    ]);
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    error,
  };
}
