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
import { TelemedicineHCPScheduleDaysResponse } from "./telemedicine-hcp-schedule-days-model";

type TelemedicineHCPScheduleDaysQuery = {
  doctorId: string;
  startDate: string;
  range: number;
};

export const telemedicineHCPScheduleDaysKeys = {
  all: ["TELEMEDICINE_HCP_SCHEDULE_DAYS"],
  lists: () => [...telemedicineHCPScheduleDaysKeys.all, "LIST"],
  list: (query: TelemedicineHCPScheduleDaysQuery) => [
    ...telemedicineHCPScheduleDaysKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getTelemedicineHCPScheduleDays({
  fetch,
  query,
}: FetcherArgs<TelemedicineHCPScheduleDaysQuery>) {
  const queryStr = {
    startDate: query.startDate,
    range: query.range,
  };
  const result = await fetch.get<TelemedicineHCPScheduleDaysResponse>(
    `${ENV.API}/telemed-service/doctors/${
      query.doctorId
    }/schedule-days${queryToString(queryStr)}`,
    { headers: { "Accept-Version": "v2" } }
  );
  return result.data;
}

export type TelemedicineHCPScheduleDaysCache = AwaitedReturn<
  typeof getTelemedicineHCPScheduleDays
>;

export function useGetTelemedicineHCPScheduleDays<
  TData = TelemedicineHCPScheduleDaysCache
>(
  query: TelemedicineHCPScheduleDaysQuery,
  options?: UseQueryOptions<TelemedicineHCPScheduleDaysCache, FetchError, TData>
) {
  return useQuery<TelemedicineHCPScheduleDaysCache, FetchError, TData>(
    telemedicineHCPScheduleDaysKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedicineHCPScheduleDays({ fetch, query });
    },
    options
  );
}
