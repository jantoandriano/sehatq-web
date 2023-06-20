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
  HCFHCPScheduleDaysResponse,
  HCFServicePackResponse,
  HCPSpecialitiesResponse,
  modelHCFHCPScheduleDays,
  modelHCFServicePack,
  modelHCPSpecialities,
} from "./related-health-care-facility-search-model";

export type SpecialitySearchQuery = {
  hospitalId: string;
};

export type HCFHCPScheduleDaysQuery = {
  hospitalId: string;
  specialityId: string;
};

export type HCFServicePackQuery = {
  hcfSlug: string;
  procedureSlug: string;
};

export const relatedHcfSearchKeys = {
  all: ["RELATED_HEALTH_CARE_FACILITY_SEARCH"],
  specialitySearchLists: () => [
    ...relatedHcfSearchKeys.all,
    "SPECIALITY_SEARCH_LISTS",
  ],
  specialitySearchList: (query: SpecialitySearchQuery) => [
    ...relatedHcfSearchKeys.specialitySearchLists(),
    cleanQuery(query),
  ],
  scheduleDaysLists: () => [...relatedHcfSearchKeys.all, "SCHEDULE_DAYS_LISTS"],
  scheduleDaysList: (query: SpecialitySearchQuery) => [
    ...relatedHcfSearchKeys.scheduleDaysLists(),
    cleanQuery(query),
  ],
  HCFservicePackLists: () => [
    ...relatedHcfSearchKeys.all,
    "SERVICE_PACK_LISTS",
  ],
  HCFservicePackList: (query: HCFServicePackQuery) => [
    ...relatedHcfSearchKeys.HCFservicePackLists(),
    cleanQuery(query),
  ],
};

export async function getSpecialitySearch({
  fetch,
  query,
}: FetcherArgs<SpecialitySearchQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<HCPSpecialitiesResponse>(
    `${ENV.API}/booking/hcp/specialities${queryString}`
  );

  return {
    data: modelHCPSpecialities(result.data),
  };
}

export type SpecialitySearchCache = Awaited<
  ReturnType<typeof getSpecialitySearch>
>;

export function useGetSpecialitySearch<TData = SpecialitySearchCache>(
  query: SpecialitySearchQuery,
  options?: UseQueryOptions<SpecialitySearchCache, FetchError, TData>
) {
  return useQuery<SpecialitySearchCache, FetchError, TData>(
    relatedHcfSearchKeys.specialitySearchList(query),
    async () => {
      const fetch = createBrowserFetch();
      return getSpecialitySearch({ fetch, query });
    },
    options
  );
}

export async function getHCFHCPScheduleDays({
  fetch,
  query,
}: FetcherArgs<HCFHCPScheduleDaysQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<HCFHCPScheduleDaysResponse>(
    `${ENV.API}/booking/schedule-days${queryString}`
  );

  return {
    data: modelHCFHCPScheduleDays(result.data),
  };
}

export type HCFHCPScheduleDaysCache = Awaited<
  ReturnType<typeof getHCFHCPScheduleDays>
>;

export function useGetHCFHCPScheduleDays<TData = HCFHCPScheduleDaysCache>(
  query: HCFHCPScheduleDaysQuery,
  options?: UseQueryOptions<HCFHCPScheduleDaysCache, FetchError, TData>
) {
  return useQuery<HCFHCPScheduleDaysCache, FetchError, TData>(
    relatedHcfSearchKeys.scheduleDaysList(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCFHCPScheduleDays({ fetch, query });
    },
    options
  );
}

export async function getHCFServicePack({
  fetch,
  query,
}: FetcherArgs<HCFServicePackQuery>) {
  const result = await fetch.get<HCFServicePackResponse>(
    `${ENV.API}/booking/hcf/${query.hcfSlug}/procedures/${query.procedureSlug}/packages`
  );

  return {
    data: modelHCFServicePack(result.data),
  };
}

export type HCFServicePackCache = Awaited<ReturnType<typeof getHCFServicePack>>;

export function useGetHCFServicePack<TData = HCFServicePackCache>(
  query: HCFServicePackQuery,
  options?: UseQueryOptions<HCFServicePackCache, FetchError, TData>
) {
  return useQuery<HCFServicePackCache, FetchError, TData>(
    relatedHcfSearchKeys.HCFservicePackList(query),
    async () => {
      const fetch = createBrowserFetch();
      return getHCFServicePack({ fetch, query });
    },
    options
  );
}
