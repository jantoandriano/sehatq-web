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
  modelForumRating,
  ForumRatingResponse,
  ForumRatingInputResponse,
} from "./forum-rating-model";

export type SubmitForumRatingVariables = {
  forumId: number;
  rating: string;
  review: string;
};

export async function submitForumRating(variables: SubmitForumRatingVariables) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<ForumRatingInputResponse>(
    `${ENV.API}/rating-service/rating/forum/${variables.forumId}`,
    { rating: variables.rating, review: variables.review }
  );
  return {
    message: response.meta.message,
  };
}

type SubmitForumRatingReturn = AwaitedReturn<typeof submitForumRating>;

export function useSubmitForumRating() {
  const toast = useToast();
  return useMutation<
    SubmitForumRatingReturn,
    FetchError,
    SubmitForumRatingVariables
  >(submitForumRating, {
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

type ForumRatingQuery = {
  forumId: string;
};

export const forumRatingKeys = {
  all: ["FORUM_RATING"],
  details: () => [...forumRatingKeys.all, "DETAIL"],
  detail: (query: ForumRatingQuery) => [
    ...forumRatingKeys.details(),
    cleanQuery(query),
  ],
};

export async function getForumRating({
  fetch,
  query,
}: FetcherArgs<ForumRatingQuery>) {
  const result = await fetch.get<ForumRatingResponse>(
    `${ENV.API}/rating-service/rating/summary/forum/${query.forumId}`
  );
  return {
    data: modelForumRating(result.data),
  };
}

export type ForumRatingCache = Awaited<ReturnType<typeof getForumRating>>;

export function useGetForumRating<TData = ForumRatingCache>(
  query: ForumRatingQuery,
  options?: UseQueryOptions<ForumRatingCache, FetchError, TData>
) {
  return useQuery<ForumRatingCache, FetchError, TData>(
    forumRatingKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getForumRating({ fetch, query });
    },
    options
  );
}
