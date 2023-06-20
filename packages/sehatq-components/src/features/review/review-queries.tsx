import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";

import { FetcherArgs, OptionalFetcherArgs } from "../../types";
import {
  ReviewsResponse,
  modelReviews,
  modelMetaReviews,
} from "./reviews-model";

type ReviewsQuery = {
  page: string;
  perPage: string;
  tagSlug: string;
};

export const ReviewKeys = {
  all: ["REVIEWS"],
  lists: () => [...ReviewKeys.all, "LISTS"],
  list: (query: ReviewsQuery) => [...ReviewKeys.lists(), cleanQuery(query)],
  featured: () => [...ReviewKeys.all, "FEATURED"],
};

export async function getReviews({ fetch, query }: FetcherArgs<ReviewsQuery>) {
  const queryString = queryToString({
    ...query,
    tagBySlug: query.tagSlug,
  });
  const result = await fetch.get<ReviewsResponse>(
    `${ENV.API}/content-service/sehatq/reviews${queryString}`
  );
  return {
    data: modelReviews(result.data),
    meta: modelMetaReviews(result.meta),
  };
}

export type ReviewsCache = Awaited<ReturnType<typeof getReviews>>;

export function useGetReviews<TData = ReviewsCache>(
  query: ReviewsQuery,
  options?: UseQueryOptions<ReviewsCache, FetchError, TData>
) {
  return useQuery<ReviewsCache, FetchError, TData>(
    ReviewKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getReviews({ fetch, query });
    },
    options
  );
}

export async function getReviewsFeatured({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<ReviewsResponse>(
    `${ENV.API}/content-service/sehatq/reviews/features`
  );
  return modelReviews(result.data);
}

export type ReviewsFeaturedCache = Awaited<
  ReturnType<typeof getReviewsFeatured>
>;

export function useGetReviewsFeatured<TData = ReviewsFeaturedCache>(
  options?: UseQueryOptions<ReviewsFeaturedCache, FetchError, TData>
) {
  return useQuery<ReviewsFeaturedCache, FetchError, TData>(
    ReviewKeys.featured(),
    async () => {
      const fetch = createBrowserFetch();
      return getReviewsFeatured({ fetch });
    },
    options
  );
}
