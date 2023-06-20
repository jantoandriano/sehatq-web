import { dehydrate, QueryClient } from "react-query";
import {
  healthToolKeys,
  getHealthTools,
  getHealthToolSEO,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export async function getHealthToolsProps(arg: { isMobile: boolean }) {
  const { isMobile } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();

  const healthToolsQuery = {
    page: "1",
    perPage: "10",
    keyword: "",
  };

  await Promise.all([
    queryClient.prefetchQuery(
      healthToolKeys.seo({ slug: "tes-kesehatan" }),
      async () =>
        await getHealthToolSEO({
          fetch,
          query: { slug: "tes-kesehatan" },
        })
    ),
    queryClient.prefetchQuery(
      healthToolKeys.list(healthToolsQuery),
      async () =>
        await getHealthTools({
          fetch,
          query: healthToolsQuery,
        })
    ),
  ]);

  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile };
}
