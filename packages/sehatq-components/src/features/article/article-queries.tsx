import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import { modelArticle, ArticleResponse } from "./article-model";
import {
  ArticlesResponse,
  modelArticles,
  modelMetaArticles,
  modelPopularArticles,
  modelPopularArticlesMeta,
  PopularArticlesResponse,
} from "./articles-model";

type ArticleQuery = {
  articleSlug: string;
};

type ArticlesQuery = {
  page: string;
  perPage: string;
  categoryId: string;
  categorySlug: string;
  tagSlug: string;
};

type PopularArticlesQuery = {
  limit: string;
  viewDate: string;
};

export const articleKeys = {
  all: ["ARTICLES"],
  details: () => [...articleKeys.all, "DETAIL"],
  detail: (query: ArticleQuery) => [
    ...articleKeys.details(),
    cleanQuery(query),
  ],
  lists: () => [...articleKeys.all, "LISTS"],
  list: (query: ArticlesQuery) => [...articleKeys.lists(), cleanQuery(query)],
  popularLists: () => ["POPULAR_ARTICLES"],
  popularList: (query: PopularArticlesQuery) => [
    ...articleKeys.popularLists(),
    cleanQuery(query),
  ],
};

export async function getArticle({ fetch, query }: FetcherArgs<ArticleQuery>) {
  const result = await fetch.get<ArticleResponse>(
    `${ENV.API}/content/articles/${query.articleSlug}`
  );
  return {
    data: modelArticle(result.data),
  };
}

export type ArticleCache = Awaited<ReturnType<typeof getArticle>>;

export function useGetArticle<TData = ArticleCache>(
  query: ArticleQuery,
  options?: UseQueryOptions<ArticleCache, FetchError, TData>
) {
  return useQuery<ArticleCache, FetchError, TData>(
    articleKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getArticle({ fetch, query });
    },
    options
  );
}

export async function getArticles({
  fetch,
  query,
}: FetcherArgs<ArticlesQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<ArticlesResponse>(
    `${ENV.API}/content/articles${queryString}`
  );

  return {
    data: modelArticles(result.data),
    meta: modelMetaArticles(result.meta),
  };
}

export type ArticlesCache = Awaited<ReturnType<typeof getArticles>>;

export function useGetArticles<TData = ArticlesCache>(
  query: ArticlesQuery,
  options?: UseQueryOptions<ArticlesCache, FetchError, TData>
) {
  return useQuery<ArticlesCache, FetchError, TData>(
    articleKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getArticles({ fetch, query });
    },
    options
  );
}

export async function getPopularArticles({
  fetch,
  query,
}: FetcherArgs<PopularArticlesQuery>) {
  const queryString = queryToString({
    limit: query.limit,
    view_date: query.viewDate,
  });
  const result = await fetch.get<PopularArticlesResponse>(
    `${ENV.API}/content-service/sehatq/article-populars${queryString}`
  );

  return {
    data: modelPopularArticles(result.data),
    meta: modelPopularArticlesMeta(result.meta),
  };
}
export type PopularArticlesCache = Awaited<
  ReturnType<typeof getPopularArticles>
>;

export function useGetPopularArticles<TData = PopularArticlesCache>(
  query: PopularArticlesQuery,
  options?: UseQueryOptions<PopularArticlesCache, FetchError, TData>
) {
  return useQuery<PopularArticlesCache, FetchError, TData>(
    articleKeys.popularList(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPopularArticles({ fetch, query });
    },
    options
  );
}
