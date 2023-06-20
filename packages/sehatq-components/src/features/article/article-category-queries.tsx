import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import { ArticleCategoriesResponse } from "./article-category-model";

export const articleCategoryKeys = {
  all: ["ARTICLE_CATEGORIES"],
  lists: () => [...articleCategoryKeys.all, "LISTS"],
};

export async function getArticleCategories({ fetch }: OptionalFetcherArgs) {
  return await fetch.get<ArticleCategoriesResponse>(
    `${ENV.API}/content-service/sehatq/article-categories`
  );
}

export type ArticleCategoriesCache = Awaited<
  ReturnType<typeof getArticleCategories>
>;

export function useGetArticleCategories<TData = ArticleCategoriesCache>(
  options?: UseQueryOptions<ArticleCategoriesCache, FetchError, TData>
) {
  return useQuery<ArticleCategoriesCache, FetchError, TData>(
    articleCategoryKeys.lists(),
    async () => {
      const fetch = createBrowserFetch();
      return getArticleCategories({ fetch });
    },
    options
  );
}
