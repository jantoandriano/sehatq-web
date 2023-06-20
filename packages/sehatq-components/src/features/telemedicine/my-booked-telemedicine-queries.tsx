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
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs, UseInfiniteQueryOptions } from "../../types";
import {
  modelMyBookedTelemedicines,
  MyBookedTelemedicinesResponse,
} from "./my-booked-telemedicine-model";

type MyBookedTelemedicinesQuery = {
  page: string;
  perPage: string;
  userId: string;
};

export const myBookedTelemedicinesKeys = {
  all: ["MY_FUTURE_TELEMED_BANNER"],
  details: () => [...myBookedTelemedicinesKeys.all, "details"],
  detail: (query: MyBookedTelemedicinesQuery) => [
    ...myBookedTelemedicinesKeys.details(),
    cleanQuery(query),
  ],
  infiniteLists: () => [...myBookedTelemedicinesKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: MyBookedTelemedicinesQuery) => [
    ...myBookedTelemedicinesKeys.infiniteLists(),
    cleanQuery(query),
  ],
};

export async function getMyBookedTelemedicines({
  fetch,
  query,
}: FetcherArgs<MyBookedTelemedicinesQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<MyBookedTelemedicinesResponse>(
    `${ENV.API}/telemed-service/booked-consultations${queryString}`
  );

  return {
    data: modelMyBookedTelemedicines(result.data),
    pagination: result.meta.pagination,
  };
}

export type MyBookedTelemedicinesCache = Awaited<
  ReturnType<typeof getMyBookedTelemedicines>
>;

export function useGetMyBookedTelemedicines<TData = MyBookedTelemedicinesCache>(
  query: MyBookedTelemedicinesQuery,
  options?: UseQueryOptions<MyBookedTelemedicinesCache, FetchError, TData>
) {
  return useQuery<MyBookedTelemedicinesCache, FetchError, TData>(
    myBookedTelemedicinesKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyBookedTelemedicines({ fetch, query });
    },
    options
  );
}

export type InfiniteMyBookedTelemedicinesCache =
  InfiniteData<MyBookedTelemedicinesCache>;

export function useGetInfiniteMyBookedTelemedicines<
  TData = InfiniteMyBookedTelemedicinesCache
>(
  query: MyBookedTelemedicinesQuery,
  options?: UseInfiniteQueryOptions<
    MyBookedTelemedicinesCache,
    FetchError,
    TData
  >
) {
  const result = useInfiniteQuery<
    MyBookedTelemedicinesCache,
    FetchError,
    TData
  >(
    myBookedTelemedicinesKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = createBrowserFetch();
      return getMyBookedTelemedicines({
        fetch,
        query: { ...query, page: pageParam },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteMyBookedTelemedicinesCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}
