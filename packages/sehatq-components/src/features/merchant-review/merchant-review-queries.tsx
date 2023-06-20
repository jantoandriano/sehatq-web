import {
  useInfiniteQuery,
  InfiniteData,
  useQuery,
  UseQueryOptions,
} from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs, UseInfiniteQueryOptions } from "../../types";
import {
  modelMerchantReviews,
  MerchantReviewsResponse,
} from "./merchant-review-model";

type MerchantReviewsQuery = {
  id: string;
  page?: number;
  perPage?: number;
  star?: string;
};

export const MerchantReviewsKeys = {
  all: ["MERCHANT_REVIEWS"],
  lists: () => [...MerchantReviewsKeys.all, "LISTS"],
  list: (query: MerchantReviewsQuery) => [
    ...MerchantReviewsKeys.lists(),
    cleanQuery(query),
  ],
  infiniteLists: () => [...MerchantReviewsKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: MerchantReviewsQuery) => [
    ...MerchantReviewsKeys.infiniteLists(),
    cleanQuery(query),
  ],
};

export async function getMerchantReviews({
  fetch,
  query,
}: FetcherArgs<MerchantReviewsQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<MerchantReviewsResponse>(
    `${ENV.API}/tcore/ratings/merchant${queryString}`
  );

  return {
    pagination: result.meta.pagination,
    data: modelMerchantReviews(result.data),
  };
}

export type MerchantReviewsCache = Awaited<
  ReturnType<typeof getMerchantReviews>
>;

export function useGetMerchantReviews<TData = MerchantReviewsCache>(
  query: MerchantReviewsQuery,
  options?: UseQueryOptions<MerchantReviewsCache, FetchError, TData>
) {
  return useQuery<MerchantReviewsCache, FetchError, TData>(
    MerchantReviewsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMerchantReviews({ fetch, query });
    },
    options
  );
}

export type InfiniteMerchantReviewsCache = InfiniteData<MerchantReviewsCache>;

export function useGetInfiniteMerchantReviews<
  TData = InfiniteMerchantReviewsCache
>(
  query: MerchantReviewsQuery,
  options?: UseInfiniteQueryOptions<MerchantReviewsCache, FetchError, TData>
) {
  const result = useInfiniteQuery<MerchantReviewsCache, FetchError, TData>(
    MerchantReviewsKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = createBrowserFetch();
      return getMerchantReviews({
        fetch,
        query: { ...query, page: pageParam },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteMerchantReviewsCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}
