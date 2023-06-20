import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  HCPSchedulesResponse,
  modelHCPSchedules,
} from "./health-care-professional-schedules-model";

export type HCPSchedulesQuery = {
  date: string;
  hcfId: string;
  hcpId: string;
  range: string;
};

export const hcpSchedulesKeys = {
  all: ["HCP_SCHEDULES"],
  lists: () => [...hcpSchedulesKeys.all, "LISTS"],
  list: (query: HCPSchedulesQuery) => [
    ...hcpSchedulesKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getHCPSchedules({
  fetch,
  query,
}: FetcherArgs<HCPSchedulesQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<HCPSchedulesResponse>(
    `${ENV.API}/booking/schedule${queryString}`
  );

  return {
    data: modelHCPSchedules(result.data),
  };
}

export type HCPSchedulesCache = Awaited<ReturnType<typeof getHCPSchedules>>;

export function useGetHCPSchedules<TData = HCPSchedulesCache>(
  query: HCPSchedulesQuery,
  options?: UseQueryOptions<HCPSchedulesCache, FetchError, TData>
) {
  return useQuery<HCPSchedulesCache, FetchError, TData>(
    hcpSchedulesKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCPSchedules({ fetch, query });
    },
    options
  );
}
