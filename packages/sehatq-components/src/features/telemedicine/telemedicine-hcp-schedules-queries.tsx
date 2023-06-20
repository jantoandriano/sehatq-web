import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import { TelemedicineHCPSchedulesResponse } from "./telemedicine-hcp-schedules-model";

type TelemedicineHCPSchedulesQuery = {
  doctorId: string;
};

export const telemedicineHCPSchedulesKeys = {
  all: ["TELEMEDICINE_DOCTORS_SCHEDULES"],
  lists: () => [...telemedicineHCPSchedulesKeys.all, "LIST"],
  list: (query: TelemedicineHCPSchedulesQuery) => [
    ...telemedicineHCPSchedulesKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getTelemedicineHCPSchedules({
  fetch,
  query,
}: FetcherArgs<TelemedicineHCPSchedulesQuery>) {
  const result = await fetch.get<TelemedicineHCPSchedulesResponse>(
    `${ENV.API}/telemed-service/doctors/${query.doctorId}/schedules`
  );
  return result.data;
}

export type TelemedicineHCPSchedulesCache = AwaitedReturn<
  typeof getTelemedicineHCPSchedules
>;

export function useGetTelemedicineHCPSchedules<
  TData = TelemedicineHCPSchedulesCache
>(
  query: TelemedicineHCPSchedulesQuery,
  options?: UseQueryOptions<TelemedicineHCPSchedulesCache, FetchError, TData>
) {
  return useQuery<TelemedicineHCPSchedulesCache, FetchError, TData>(
    telemedicineHCPSchedulesKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedicineHCPSchedules({ fetch, query });
    },
    options
  );
}
