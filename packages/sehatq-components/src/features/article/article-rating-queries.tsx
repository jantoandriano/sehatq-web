import { useMutation, useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  FetchError,
  cleanQuery,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { useToast } from "../../user-interfaces";
import { FetcherArgs } from "../../types";
import {
  modelArticleRating,
  ArticleRatingResponse,
  ArticleRatingInputResponse,
} from "./article-rating-model";

export type SubmitArticleRatingVariables = {
  articleId: number;
  rating: string;
  review: string;
};

export async function submitArticleRating(
  variables: SubmitArticleRatingVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<ArticleRatingInputResponse>(
    `${ENV.API}/rating-service/rating/article/${variables.articleId}`,
    { rating: variables.rating, review: variables.review }
  );
  return {
    message: response.meta.message,
  };
}

type SubmitArticleRatingReturn = AwaitedReturn<typeof submitArticleRating>;

export function useSubmitArticleRating() {
  const toast = useToast();
  return useMutation<
    SubmitArticleRatingReturn,
    FetchError,
    SubmitArticleRatingVariables
  >(submitArticleRating, {
    onError: ({ message }) => {
      toast({
        message,
        status: "error",
      });
    },
    onSuccess: (data) => {
      toast({
        message: data.message,
        status: "success",
      });
    },
  });
}

type ArticleRatingQuery = {
  articleId: string;
};

export const ArticleRatingKeys = {
  all: ["ARTICLE_RATING"],
  details: () => [...ArticleRatingKeys.all, "DETAIL"],
  detail: (query: ArticleRatingQuery) => [
    ...ArticleRatingKeys.details(),
    cleanQuery(query),
  ],
};

export async function getArticleRating({
  fetch,
  query,
}: FetcherArgs<ArticleRatingQuery>) {
  const result = await fetch.get<ArticleRatingResponse>(
    `${ENV.API}/rating-service/rating/summary/article/${query.articleId}`
  );
  return {
    data: modelArticleRating(result.data),
  };
}

export type ArticleRatingCache = Awaited<ReturnType<typeof getArticleRating>>;

export function useGetArticleRating<TData = ArticleRatingCache>(
  query: ArticleRatingQuery,
  options?: UseQueryOptions<ArticleRatingCache, FetchError, TData>
) {
  return useQuery<ArticleRatingCache, FetchError, TData>(
    ArticleRatingKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getArticleRating({ fetch, query });
    },
    options
  );
}
