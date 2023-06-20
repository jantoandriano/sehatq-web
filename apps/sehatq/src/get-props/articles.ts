import { dehydrate, QueryClient } from "react-query";
import { articleKeys, getArticles } from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type ArticlesParams = {
  slugs: string[];
};

export type ArticlesQuery = {
  page: string;
  perPage: string;
};

export async function getArticlesProps(
  arg: ArticlesParams & { isMobile: boolean } & ArticlesQuery
) {
  const { slugs, isMobile, page, perPage } = arg;
  const [slug] = slugs;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();

  const articlesQuery = {
    page: page ?? "1",
    perPage: perPage ?? "10",
    categorySlug: slug,
    categoryId: "",
    tagSlug: "",
  };

  await queryClient.prefetchQuery(
    articleKeys.list(articlesQuery),
    async () =>
      await getArticles({
        fetch,
        query: articlesQuery,
      })
  );

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
  };
}
