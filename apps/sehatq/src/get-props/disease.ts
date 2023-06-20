import { dehydrate, QueryClient } from "react-query";
import { diseaseListKeys, getDiseaseDetail } from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type DiseaseQuery = {
  slug: string;
};

export async function getDiseaseProps(
  arg: DiseaseQuery & { isMobile: boolean }
) {
  const { slug, isMobile } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;

  try {
    await queryClient.fetchQuery(
      diseaseListKeys.detail({ diseaseSlug: slug }),
      async () =>
        await getDiseaseDetail({
          fetch,
          query: { diseaseSlug: slug },
        })
    );
  } catch (err) {
    error = err;
  }

  return {
    error,
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
  };
}
