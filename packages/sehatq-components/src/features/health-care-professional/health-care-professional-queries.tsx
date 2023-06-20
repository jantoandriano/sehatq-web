import {
  useInfiniteQuery,
  InfiniteData,
  useQuery,
  UseQueryOptions,
  useMutation,
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
import { useToast } from "../../user-interfaces";
import {
  HCPListResponse,
  modelHCPList,
  modelMetaHCPList,
  modelHCPSEO,
  HCPSEOResponse,
} from "./health-care-professional-model";
import {
  HCPDetailResponse,
  modelHCPDetail,
} from "./health-care-professional-detail-model";

export type HCPListQuery = {
  page: string;
  perPage: string;
  userLat: string;
  userLong: string;
  query: string;
  procedureId: string;
  scheduleDayId: string;
  citySlug: string;
  gender: string;
  specialitySlug: string;
  sortBy: string;
  hcfId: string;
};

export type HCPSEOQuery = {
  specialitySlug: string;
};

export type HCPDetailQuery = {
  hcpSlug: string;
  userLat: string;
  userLong: string;
};

export const hcpKeys = {
  all: ["HEALTH_CARE_PROFESSIONAL_LIST"],
  lists: () => [...hcpKeys.all, "LISTS"],
  list: (query: HCPListQuery) => [...hcpKeys.lists(), cleanQuery(query)],
  infiniteLists: () => [...hcpKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: HCPListQuery) => [
    ...hcpKeys.infiniteLists(),
    cleanQuery(query),
  ],
  seos: () => [...hcpKeys.all, "SEO"],
  seo: (query: HCPSEOQuery) => [...hcpKeys.seos(), cleanQuery(query)],
  details: () => [...hcpKeys.all, "DETAIL"],
  detail: (query: HCPDetailQuery) => [...hcpKeys.details(), cleanQuery(query)],
};

export async function getHCPList({ fetch, query }: FetcherArgs<HCPListQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<HCPListResponse>(
    `${ENV.API}/booking/hcp${queryString}`,
    { headers: { "Accept-Version": "V2" } }
  );

  return {
    data: modelHCPList(result.data),
    meta: modelMetaHCPList(result.meta),
  };
}

export type HCPListCache = Awaited<ReturnType<typeof getHCPList>>;

export function useGetHCPList<TData = HCPListCache>(
  query: HCPListQuery,
  options?: UseQueryOptions<HCPListCache, FetchError, TData>
) {
  return useQuery<HCPListCache, FetchError, TData>(
    hcpKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCPList({ fetch, query });
    },
    options
  );
}

export type InfiniteHCPListCache = InfiniteData<HCPListCache>;

export function useGetInfiniteHCPList<TData = InfiniteHCPListCache>(
  query: HCPListQuery,
  options?: UseInfiniteQueryOptions<HCPListCache, FetchError, TData>
) {
  const result = useInfiniteQuery<HCPListCache, FetchError, TData>(
    hcpKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = createBrowserFetch();
      return getHCPList({
        fetch,
        query: { ...query, page: pageParam },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteHCPListCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.meta.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}

export async function getHCPSEO({ fetch, query }: FetcherArgs<HCPSEOQuery>) {
  const result = await fetch.get<HCPSEOResponse>(
    `${ENV.API}/content-service/sehatq/seo-contents/domain/hcp/slug/${query.specialitySlug}`
  );
  return modelHCPSEO(result.data);
}

export type HCPSEOCache = AwaitedReturn<typeof getHCPSEO>;

export function useGetHCPSEO<TData = HCPSEOCache>(
  query: HCPSEOQuery,
  options?: UseQueryOptions<HCPSEOCache, FetchError, TData>
) {
  return useQuery<HCPSEOCache, FetchError, TData>(
    hcpKeys.seo(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCPSEO({ fetch, query });
    },
    options
  );
}

export async function getHCPDetail({
  fetch,
  query,
}: FetcherArgs<HCPDetailQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<HCPDetailResponse>(
    `${ENV.API}/booking/hcp/${query.hcpSlug}${queryString}`
  );
  return {
    data: modelHCPDetail(result.data),
  };
}

export type HCPDetailCache = Awaited<ReturnType<typeof getHCPDetail>>;

export function useGetHCPDetail<TData = HCPDetailCache>(
  query: HCPDetailQuery,
  options?: UseQueryOptions<HCPDetailCache, FetchError, TData>
) {
  return useQuery<HCPDetailCache, FetchError, TData>(
    hcpKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCPDetail({ fetch, query });
    },
    options
  );
}

type MutateHCPDetailCache = AwaitedReturn<typeof getHCPDetail>;

export function useMutateGetHCPDetail() {
  const toast = useToast();
  return useMutation<MutateHCPDetailCache, FetchError, HCPDetailQuery>(
    (query) => {
      const fetch = createBrowserFetch();
      return getHCPDetail({ fetch, query });
    },
    {
      onError: ({ message }) => {
        toast({
          message,
          status: "error",
        });
      },
    }
  );
}
