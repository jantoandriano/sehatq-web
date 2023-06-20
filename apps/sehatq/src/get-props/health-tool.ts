import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  healthToolKeys,
  getHealthToolDetail,
  getHealthToolSEO,
} from "@sehatq/components";

export type HealthToolDetailParams = {
  cookie: string | undefined;
};

export type HealthToolParams = {
  slug: string;
};

export async function getHealthToolProps(
  arg: { isMobile: boolean; slug: string } & HealthToolDetailParams
) {
  const { isMobile, cookie, slug } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();
  let error = null;

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        healthToolKeys.seo({ slug }),
        async () =>
          await getHealthToolSEO({
            fetch,
            query: { slug },
          })
      ),
      queryClient.prefetchQuery(
        healthToolKeys.detail({ idOrSlugOrFormcode: slug }),
        async () =>
          await getHealthToolDetail({
            fetch,
            query: { idOrSlugOrFormcode: slug },
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
    slug,
  };
}
