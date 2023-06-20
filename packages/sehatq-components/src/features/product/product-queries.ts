import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  AwaitedReturn,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelProduct,
  ProductResponse,
  modelProducts,
  ProductsResponse,
  modelRelatedProducts,
  RelatedProductsResponse,
} from "./product-model";

type ProductQuery = {
  slug: string;
};

type ProductsQuery = {
  page: string;
  perPage: string;
  sortBy: string;
  categorySlug: string;
};

export const productKeys = {
  all: ["PRODUCT"],
  lists: () => [...productKeys.all, "LISTS"],
  list: (query: ProductsQuery) => [...productKeys.lists(), cleanQuery(query)],
  details: () => [...productKeys.all, "DETAIL"],
  detail: (query: ProductQuery) => [
    ...productKeys.details(),
    cleanQuery(query),
  ],
  infiniteLists: () => [...productKeys.all, "INFINITE_LISTS"],
};

export async function getProduct({ fetch, query }: FetcherArgs<ProductQuery>) {
  const result = await fetch.get<ProductResponse>(
    `${ENV.API}/tproduct/products/${query.slug}`
  );
  return modelProduct(result.data);
}

export type ProductCache = AwaitedReturn<typeof getProduct>;

export function useGetProduct<TData = ProductCache>(
  query: ProductQuery,
  options?: UseQueryOptions<ProductCache, FetchError, TData>
) {
  return useQuery<ProductCache, FetchError, TData>(
    productKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getProduct({ fetch, query });
    },
    options
  );
}

export async function getProducts({
  fetch,
  query,
}: FetcherArgs<ProductsQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<ProductsResponse>(
    `${ENV.API}/tproduct/products${queryString}`
  );
  return modelProducts(result.data);
}

export type ProductsCache = AwaitedReturn<typeof getProducts>;

export function useGetProducts<TData = ProductsCache>(
  query: ProductsQuery,
  options?: UseQueryOptions<ProductsCache, FetchError, TData>
) {
  return useQuery<ProductsCache, FetchError, TData>(
    productKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getProducts({ fetch, query });
    },
    options
  );
}

/**
 * Related Products
 */

type RelatedProductsQuery = {
  tagSlug: string;
  page: string;
  perPage: string;
};

export const relatedProductsKeys = {
  all: ["RELATED_PRODUCTS"],
  lists: () => [...relatedProductsKeys.all, "LISTS"],
  list: (query: RelatedProductsQuery) => [
    ...relatedProductsKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getRelatedProducts({
  fetch,
  query,
}: FetcherArgs<RelatedProductsQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<RelatedProductsResponse>(
    `${ENV.API}/tproduct/mini_products${queryString}`
  );
  return modelRelatedProducts(result.data);
}

export type RelatedProductsCache = AwaitedReturn<typeof getRelatedProducts>;

export function useGetRelatedProducts<TData = RelatedProductsCache>(
  query: RelatedProductsQuery,
  options?: UseQueryOptions<RelatedProductsCache, FetchError, TData>
) {
  return useQuery<RelatedProductsCache, FetchError, TData>(
    relatedProductsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getRelatedProducts({ fetch, query });
    },
    options
  );
}
