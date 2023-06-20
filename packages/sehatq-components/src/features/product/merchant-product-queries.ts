import {
  useQuery,
  useInfiniteQuery,
  InfiniteData,
  UseQueryOptions,
} from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  queryToString,
  FetchError,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs, UseInfiniteQueryOptions } from "../../types";
import {
  modelMerchantProducts,
  MerchantProductsResponse,
} from "./merchant-product-model";

export type MerchantProductsQuery = {
  merchantId: string;
  productSlug: string;
  perPage: string;
  page: string;
  sortBy: string;
  long: string;
  lat: string;
};

export const merchantProductKeys = {
  all: ["MERCHANT_PRODUCT"],
  lists: () => [...merchantProductKeys.all, "LISTS"],
  list: (query: MerchantProductsQuery) => [
    ...merchantProductKeys.lists(),
    cleanQuery(query),
  ],
  infiniteLists: () => [...merchantProductKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: MerchantProductsQuery) => [
    ...merchantProductKeys.infiniteLists(),
    cleanQuery(query),
  ],
};

export async function getMerchantProducts({
  fetch,
  query,
}: FetcherArgs<MerchantProductsQuery>) {
  const { productSlug, merchantId, ...otherQuery } = query;
  const queryString = queryToString({
    ...otherQuery,
    merchantId,
    filter: `${Boolean(merchantId)}`,
  });
  const result = await fetch.get<MerchantProductsResponse>(
    `${ENV.API}/tproduct/products/${productSlug}/merchants${queryString}`
  );
  return {
    pagination: result.meta.pagination,
    sortByOptions: result.meta.sortBy.map((option) => ({
      id: option.id,
      label: option.name,
    })),
    data: modelMerchantProducts(result.data),
  };
}

export type MerchantProductsCache = Awaited<
  ReturnType<typeof getMerchantProducts>
>;

export function useGetMerchantProducts<TData = MerchantProductsCache>(
  query: MerchantProductsQuery,
  options?: UseQueryOptions<MerchantProductsCache, FetchError, TData>
) {
  return useQuery<MerchantProductsCache, FetchError, TData>(
    merchantProductKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMerchantProducts({ fetch, query });
    },
    options
  );
}

export type InfiniteMerchantProductCache = InfiniteData<MerchantProductsCache>;

export function useGetInfiniteMerchantProducts<
  TData = InfiniteMerchantProductCache
>(
  query: MerchantProductsQuery,
  options?: UseInfiniteQueryOptions<MerchantProductsCache, FetchError, TData>
) {
  const result = useInfiniteQuery<MerchantProductsCache, FetchError, TData>(
    merchantProductKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = createBrowserFetch();
      return getMerchantProducts({
        fetch,
        query: { ...query, page: pageParam },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteMerchantProductCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}
