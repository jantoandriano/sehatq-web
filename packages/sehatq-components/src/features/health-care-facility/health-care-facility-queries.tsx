import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  UseQueryOptions,
} from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  queryToString,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs, UseInfiniteQueryOptions } from "../../types";
import {
  HCFDetailResponse,
  HCFListResponse,
  HCFSEOResponse,
  modelHCFDetail,
  modelHCFList,
  modelHCFSEO,
  modelMetaHCFList,
} from "./health-care-facility-model";

export type HCFListQuery = {
  page: string;
  perPage: string;
  userLat: string;
  userLong: string;
  sortBy: string;
  partner: string;
  hcfTypeSlug: string;
  procedureId: string;
  medicalFacilityId: string;
  query: string;
  citySlug: string;
};

export type HCFDetailQuery = {
  hcfSlug: string;
  userLat: string;
  userLong: string;
};

export type HCFSEOQuery = {
  hcfTypeSlug: string;
};

export const hcfKeys = {
  all: ["HEALT_CARE_FACILITY_LIST"],
  lists: () => [...hcfKeys.all, "LISTS"],
  list: (query: HCFListQuery) => [...hcfKeys.lists(), cleanQuery(query)],
  infiniteLists: () => [...hcfKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: HCFListQuery) => [
    ...hcfKeys.infiniteLists(),
    cleanQuery(query),
  ],
  details: () => [...hcfKeys.all, "DETAIL"],
  detail: (query: HCFDetailQuery) => [...hcfKeys.details(), cleanQuery(query)],
  seos: () => [...hcfKeys.all, "SEO"],
  seo: (query: HCFSEOQuery) => [...hcfKeys.seos(), cleanQuery(query)],
};

export async function getHCFList({ fetch, query }: FetcherArgs<HCFListQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<HCFListResponse>(
    `${ENV.API}/booking/hcf${queryString}`,
    {
      headers: {
        "Accept-Version": "v2",
      },
    }
  );

  return {
    data: modelHCFList(result.data),
    meta: modelMetaHCFList(result.meta),
  };
}

export type HCFListCache = Awaited<ReturnType<typeof getHCFList>>;

export function useGetHCFList<TData = HCFListCache>(
  query: HCFListQuery,
  options?: UseQueryOptions<HCFListCache, FetchError, TData>
) {
  return useQuery<HCFListCache, FetchError, TData>(
    hcfKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCFList({ fetch, query });
    },
    options
  );
}

export type InfiniteHCFListCache = InfiniteData<HCFListCache>;

export function useGetInfiniteHCFList<TData = InfiniteHCFListCache>(
  query: HCFListQuery,
  options?: UseInfiniteQueryOptions<HCFListCache, FetchError, TData>
) {
  const result = useInfiniteQuery<HCFListCache, FetchError, TData>(
    hcfKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = createBrowserFetch();
      return getHCFList({
        fetch,
        query: { ...query, page: pageParam },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteHCFListCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.meta.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}

export async function getHCFDetail({
  fetch,
  query,
}: FetcherArgs<HCFDetailQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<HCFDetailResponse>(
    `${ENV.API}/booking/hcf/${query.hcfSlug}${queryString}`
  );
  return {
    data: modelHCFDetail(result.data),
  };
}

export type HCFDetailCache = Awaited<ReturnType<typeof getHCFDetail>>;

export function useGetHCFDetail<TData = HCFDetailCache>(
  query: HCFDetailQuery,
  options?: UseQueryOptions<HCFDetailCache, FetchError, TData>
) {
  return useQuery<HCFDetailCache, FetchError, TData>(
    hcfKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCFDetail({ fetch, query });
    },
    options
  );
}

export async function getHCFSEO({ fetch, query }: FetcherArgs<HCFSEOQuery>) {
  const result = await fetch.get<HCFSEOResponse>(
    `${ENV.API}/content-service/sehatq/seo-contents/domain/hcf/slug/${query.hcfTypeSlug}`
  );
  return modelHCFSEO(result.data);
}

export type HCFSEOCache = AwaitedReturn<typeof getHCFSEO>;

export function useGetHCFSEO<TData = HCFSEOCache>(
  query: HCFSEOQuery,
  options?: UseQueryOptions<HCFSEOCache, FetchError, TData>
) {
  return useQuery<HCFSEOCache, FetchError, TData>(
    hcfKeys.seo(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCFSEO({ fetch, query });
    },
    options
  );
}
