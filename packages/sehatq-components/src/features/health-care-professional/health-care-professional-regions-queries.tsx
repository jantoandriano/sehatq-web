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
  HCPRegionResponse,
  modelHCPRegion,
} from "./health-care-professional-regions-model";

type HCPRegionQuery = {
  cityCode: string;
  perPage: string;
};

export const hcpRegionKeys = {
  all: ["HCP_REGIONS"],
  lists: () => [...hcpRegionKeys.all, "LISTS"],
  list: (query: HCPRegionQuery) => [
    ...hcpRegionKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getHCPRegion({
  fetch,
  query,
}: FetcherArgs<HCPRegionQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<HCPRegionResponse>(
    `${ENV.API}/booking/regions${queryString}`
  );

  return {
    data: modelHCPRegion(result.data),
  };
}

export type HCPRegionCache = Awaited<ReturnType<typeof getHCPRegion>>;

export function useGetHCPRegion<TData = HCPRegionCache>(
  query: HCPRegionQuery,
  options?: UseQueryOptions<HCPRegionCache, FetchError, TData>
) {
  return useQuery<HCPRegionCache, FetchError, TData>(
    hcpRegionKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCPRegion({ fetch, query });
    },
    options
  );
}
