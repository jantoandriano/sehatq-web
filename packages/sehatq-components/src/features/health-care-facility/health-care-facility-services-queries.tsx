import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, cleanQuery, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  HCFServicesResponse,
  modelHCFServices,
} from "./health-care-facility-services-model";

export type HCFServicesQuery = {
  hcfSlug: string;
};

export const hcfServiceKeys = {
  all: ["HEALT_CARE_FACILITY_SERVICES"],
  lists: () => [...hcfServiceKeys.all, "LISTS"],
  list: (query: HCFServicesQuery) => [
    ...hcfServiceKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getHCFServices({
  fetch,
  query,
}: FetcherArgs<HCFServicesQuery>) {
  const result = await fetch.get<HCFServicesResponse>(
    `${ENV.API}/booking/hcf/${query.hcfSlug}/procedures`
  );

  return {
    data: modelHCFServices(result.data),
  };
}

export type HCFServicesCache = Awaited<ReturnType<typeof getHCFServices>>;

export function useGetHCFServices<TData = HCFServicesCache>(
  query: HCFServicesQuery,
  options?: UseQueryOptions<HCFServicesCache, FetchError, TData>
) {
  return useQuery<HCFServicesCache, FetchError, TData>(
    hcfServiceKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCFServices({ fetch, query });
    },
    options
  );
}
