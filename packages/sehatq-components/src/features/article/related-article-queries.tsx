import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelRelatedArticles,
  RelatedArticlesResponse,
} from "./related-articles-model";

type RelatedArticlesQuery = {
  quantity: string;
  tagId: string;
  repeater: string;
};

export const relatedArticleKeys = {
  all: ["RELATED_ARTICLES"],
  lists: () => [...relatedArticleKeys.all, "LISTS"],
  list: (query: RelatedArticlesQuery) => [
    ...relatedArticleKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getRelatedArticles({
  fetch,
  query,
}: FetcherArgs<RelatedArticlesQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<RelatedArticlesResponse>(
    `${ENV.API}/content/related/articles${queryString}`
  );

  return {
    data: modelRelatedArticles(result.data),
  };
}

export type RelatedArticlesCache = Awaited<
  ReturnType<typeof getRelatedArticles>
>;

export function useGetRelatedArticles<TData = RelatedArticlesCache>(
  query: RelatedArticlesQuery,
  options?: UseQueryOptions<RelatedArticlesCache, FetchError, TData>
) {
  return useQuery<RelatedArticlesCache, FetchError, TData>(
    relatedArticleKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getRelatedArticles({ fetch, query });
    },
    options
  );
}
