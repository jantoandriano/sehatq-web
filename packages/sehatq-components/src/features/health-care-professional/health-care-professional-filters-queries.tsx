import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import {
  HCPFiltersResponse,
  modelHCPFilters,
} from "./health-care-professional-filters-model";

export const hcpFiltersKeys = {
  all: ["HCPFilters"],
  lists: () => [...hcpFiltersKeys.all, "LIST"],
  list: () => [...hcpFiltersKeys.lists()],
};

export async function getHCPFilters({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<HCPFiltersResponse>(
    `${ENV.API}/booking/filter-option`
  );
  return {
    data: modelHCPFilters(result.data),
  };
}

export type HCPFiltersCache = Awaited<ReturnType<typeof getHCPFilters>>;

export function useGetHCPFilters<TData = HCPFiltersCache>(
  options?: UseQueryOptions<HCPFiltersCache, FetchError, TData>
) {
  return useQuery<HCPFiltersCache, FetchError, TData>(
    hcpFiltersKeys.list(),
    async () => {
      const fetch = createBrowserFetch();
      return getHCPFilters({ fetch });
    },
    options
  );
}
