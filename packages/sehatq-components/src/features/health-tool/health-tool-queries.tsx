import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
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
  modelHealthToolDetail,
  modelHealthToolRecordDetail,
  HealthToolDetailResponse,
  HealthToolSEOResponse,
  modelHealthToolSEO,
  RemoveHealthToolScoreResponse,
} from "./health-tool-model";
import {
  modelHealthTools,
  HealthToolsResponse,
  HealthToolScoreListResponse,
  modelMetaScoreList,
  modelHealthToolScoreList,
} from "./health-tools-model";

type HealthToolsQuery = {
  page: string;
  perPage: string;
  keyword: string;
};

type HealthToolScoreListQuery = {
  page: string;
  perPage: string;
  healthToolSlug: string;
  userId: string;
  dateRange: string;
};

type HealthToolQuery = {
  idOrSlugOrFormcode: string;
};

type HealthToolSEOQuery = {
  slug: string;
};

type HealthToolRecordDetailQuery = {
  healthToolsIdOrSlug: string;
  id: string;
};

export const healthToolKeys = {
  all: ["HEALTH_TOOL"],
  lists: () => [...healthToolKeys.all, "LISTS"],
  list: (query: HealthToolsQuery) => [
    ...healthToolKeys.lists(),
    cleanQuery(query),
  ],
  scoreLists: () => [...healthToolKeys.all, "SOCRELISTS"],
  scoreList: (query: HealthToolScoreListQuery) => [
    ...healthToolKeys.scoreLists(),
    cleanQuery(query),
  ],
  details: () => [...healthToolKeys.all, "DETAIL"],
  detail: (query: HealthToolQuery) => [
    ...healthToolKeys.details(),
    cleanQuery(query),
  ],
  seos: () => [...healthToolKeys.all, "SEO"],
  seo: (query: HealthToolSEOQuery) => [
    ...healthToolKeys.seos(),
    cleanQuery(query),
  ],
  recordDetails: () => [...healthToolKeys.all, "RECORD_DETAIL"],
  recordDetail: (query: HealthToolRecordDetailQuery) => [
    ...healthToolKeys.recordDetails(),
    cleanQuery(query),
  ],
};

export async function getHealthToolRecordsDetail({
  fetch,
  query,
}: FetcherArgs<HealthToolRecordDetailQuery>) {
  const result = await fetch.get(
    `${ENV.API}/healthtools-service/sehatq/health-tools/${query.healthToolsIdOrSlug}/health-records/${query.id}`
  );
  return {
    data: modelHealthToolRecordDetail(result.data),
  };
}

export type HealthToolRecordsDetailCache = Awaited<
  ReturnType<typeof getHealthToolRecordsDetail>
>;
export function useGetHealthToolRecordsDetail<
  TData = HealthToolRecordsDetailCache
>(
  query: HealthToolRecordDetailQuery,
  options?: UseQueryOptions<HealthToolRecordsDetailCache, FetchError, TData>
) {
  return useQuery<HealthToolRecordsDetailCache, FetchError, TData>(
    healthToolKeys.recordDetail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHealthToolRecordsDetail({ fetch, query });
    },
    options
  );
}

export async function getHealthToolDetail({
  fetch,
  query,
}: FetcherArgs<HealthToolQuery>) {
  const result = await fetch.get<HealthToolDetailResponse>(
    `${ENV.API}/content-service/sehatq/health-tools/${query.idOrSlugOrFormcode}`
  );
  return {
    data: modelHealthToolDetail(result),
  };
}

export async function getHealthToolSEO({
  fetch,
  query,
}: FetcherArgs<HealthToolSEOQuery>) {
  const result = await fetch.get<HealthToolSEOResponse>(
    `${ENV.API}/content-service/sehatq/seo-contents/domain/health-tools/slug/${query.slug}`
  );
  return modelHealthToolSEO(result.data);
}

export type HealthToolDetailCache = Awaited<
  ReturnType<typeof getHealthToolDetail>
>;
export function useGetHealthToolDetail<TData = HealthToolDetailCache>(
  query: HealthToolQuery,
  options?: UseQueryOptions<HealthToolDetailCache, FetchError, TData>
) {
  return useQuery<HealthToolDetailCache, FetchError, TData>(
    healthToolKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHealthToolDetail({ fetch, query });
    },
    options
  );
}

export type HealthToolSEOCache = Awaited<ReturnType<typeof getHealthToolSEO>>;
export function useGetHealthToolSEO<TData = HealthToolSEOCache>(
  query: HealthToolSEOQuery,
  options?: UseQueryOptions<HealthToolSEOCache, FetchError, TData>
) {
  return useQuery<HealthToolSEOCache, FetchError, TData>(
    healthToolKeys.seo(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHealthToolSEO({ fetch, query });
    },
    options
  );
}

export async function getHealthTools({
  fetch,
  query,
}: FetcherArgs<HealthToolsQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<HealthToolsResponse>(
    `${ENV.API}/content-service/sehatq/health-tools${queryString}`
  );

  return {
    data: modelHealthTools(result.data),
  };
}

export type HealthToolsCache = Awaited<ReturnType<typeof getHealthTools>>;
export function useGetHealthTools<TData = HealthToolsCache>(
  query: HealthToolsQuery,
  options?: UseQueryOptions<HealthToolsCache, FetchError, TData>
) {
  return useQuery<HealthToolsCache, FetchError, TData>(
    healthToolKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHealthTools({ fetch, query });
    },
    options
  );
}

export async function getHealthToolScoreList({
  fetch,
  query,
}: FetcherArgs<HealthToolScoreListQuery>) {
  const { healthToolSlug, ...othersQuery } = query;
  const queryString = queryToString({
    ...othersQuery,
  });
  const result = await fetch.get<HealthToolScoreListResponse>(
    `${ENV.API}/healthtools-service/sehatq/health-tools/${healthToolSlug}/health-records${queryString}`
  );

  return {
    data: modelHealthToolScoreList(result.data),
    meta: modelMetaScoreList(result.meta),
  };
}

export type HealthToolScoreListCache = Awaited<
  ReturnType<typeof getHealthToolScoreList>
>;

export type InfiniteHealthToolScoreListCache =
  InfiniteData<HealthToolScoreListCache>;

export function useGetHealthToolScoreList<
  TData = InfiniteHealthToolScoreListCache
>(
  query: HealthToolScoreListQuery,
  options?: UseInfiniteQueryOptions<HealthToolScoreListCache, FetchError, TData>
) {
  const result = useInfiniteQuery<HealthToolScoreListCache, FetchError, TData>(
    healthToolKeys.scoreList(query),
    async ({ pageParam = query.page }) => {
      const fetch = createBrowserFetch();
      return getHealthToolScoreList({
        fetch,
        query: { ...query, page: pageParam },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteHealthToolScoreListCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.meta.pagination.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}

export type RemoveHealthToolScoreVariables = {
  healthToolScoreId: number;
  healthToolSlug: string;
};

export async function removeHealthToolScore(
  variables: RemoveHealthToolScoreVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.delete<RemoveHealthToolScoreResponse>(
    `${ENV.API}/healthtools-service/sehatq/health-tools/${variables.healthToolSlug}/health-records/${variables.healthToolScoreId}`,
    {}
  );

  return {
    message: response.meta?.message,
  };
}

type RemoveHealthToolScoreReturn = AwaitedReturn<typeof removeHealthToolScore>;

export function useDeleteHealthToolScore() {
  const queryClient = useQueryClient();

  return useMutation<
    RemoveHealthToolScoreReturn,
    FetchError,
    RemoveHealthToolScoreVariables
  >(removeHealthToolScore, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: healthToolKeys.scoreLists(),
      });
    },
  });
}
