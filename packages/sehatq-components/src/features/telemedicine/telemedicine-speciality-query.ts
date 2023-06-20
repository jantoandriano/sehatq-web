import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  AwaitedReturn,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import { TelemedicineSpecialitiesResponse } from "./telemedicine-speciality-model";

type TelemedicineSpecialitiesQuery = {
  page: string;
  perPage: string;
  hospitalId: string;
};

export const telemedicineSpecialityKeys = {
  all: ["TAG"],
  lists: () => [...telemedicineSpecialityKeys.all, "LIST"],
  list: (query: TelemedicineSpecialitiesQuery) => [
    ...telemedicineSpecialityKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getTelemedicineSpecialities({
  fetch,
  query,
}: FetcherArgs<TelemedicineSpecialitiesQuery>) {
  const result = await fetch.get<TelemedicineSpecialitiesResponse>(
    `${ENV.API}/telemed-service/doctor-specialities${queryToString(query)}`
  );
  return result.data;
}

export type TelemedicineSpecialitiesCache = AwaitedReturn<
  typeof getTelemedicineSpecialities
>;

export function useGetTelemedicineSpecialities<
  TData = TelemedicineSpecialitiesCache
>(
  query: TelemedicineSpecialitiesQuery,
  options?: UseQueryOptions<TelemedicineSpecialitiesCache, FetchError, TData>
) {
  return useQuery<TelemedicineSpecialitiesCache, FetchError, TData>(
    telemedicineSpecialityKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedicineSpecialities({ fetch, query });
    },
    options
  );
}
