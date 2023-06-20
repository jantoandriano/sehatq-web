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
import {
  FetcherArgs,
  OptionalFetcherArgs,
  UseInfiniteQueryOptions,
} from "../../types";
import {
  modelMyTelemedicines,
  MyTelemedicinesResponse,
  modelMyTelemedicine,
  MyTelemedicineResponse,
} from "./my-telemedicine-model";

export type MyTelemedicinesQuery = {
  page: string;
  perPage: string;
  userId: string;
};

export const myTelemedicineKeys = {
  all: ["MY_TELEMEDICINE"],
  lists: () => [...myTelemedicineKeys.all, "LISTS"],
  list: (query: MyTelemedicinesQuery) => [
    ...myTelemedicineKeys.lists(),
    cleanQuery(query),
  ],
  infiniteLists: () => [...myTelemedicineKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: MyTelemedicinesQuery) => [
    ...myTelemedicineKeys.infiniteLists(),
    cleanQuery(query),
  ],
  latest: () => [...myTelemedicineKeys.all, "LATEST"],
};

export async function getMyTelemedicines({
  fetch,
  query,
}: FetcherArgs<MyTelemedicinesQuery>) {
  const queryString = queryToString({
    ...query,
    userId: query.userId !== "all" ? query.userId : "",
  });
  const result = await fetch.get<MyTelemedicinesResponse>(
    `${ENV.API}/telemed-service/consultations/histories${queryString}`
  );
  return {
    pagination: result.meta.pagination,
    data: modelMyTelemedicines(result.data),
  };
}

export type MyTelemedicinesCache = Awaited<
  ReturnType<typeof getMyTelemedicines>
>;

export function useGetMyTelemedicines<TData = MyTelemedicinesCache>(
  query: MyTelemedicinesQuery,
  options?: UseQueryOptions<MyTelemedicinesCache, FetchError, TData>
) {
  return useQuery<MyTelemedicinesCache, FetchError, TData>(
    myTelemedicineKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyTelemedicines({ fetch, query });
    },
    options
  );
}

export type InfiniteMyTelemedicineCache = InfiniteData<MyTelemedicinesCache>;

export function useGetInfiniteMyTelemedicines<
  TData = InfiniteMyTelemedicineCache
>(
  query: MyTelemedicinesQuery,
  options?: UseInfiniteQueryOptions<MyTelemedicinesCache, FetchError, TData>
) {
  const result = useInfiniteQuery<MyTelemedicinesCache, FetchError, TData>(
    myTelemedicineKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = createBrowserFetch();
      return getMyTelemedicines({
        fetch,
        query: { ...query, page: pageParam },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteMyTelemedicineCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}

export async function getMyLatestTelemedicine({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<MyTelemedicineResponse>(
    `${ENV.API}/telemed-service/consultations/latest`
  );
  return modelMyTelemedicine(result);
}

export type MyLatestTelemedicineCache = Awaited<
  ReturnType<typeof getMyLatestTelemedicine>
>;

export function useGetMyLatestTelemedicine<TData = MyLatestTelemedicineCache>(
  options?: UseQueryOptions<MyLatestTelemedicineCache, FetchError, TData>
) {
  return useQuery<MyLatestTelemedicineCache, FetchError, TData>(
    myTelemedicineKeys.latest(),
    async () => {
      const fetch = createBrowserFetch();
      return getMyLatestTelemedicine({ fetch });
    },
    options
  );
}
