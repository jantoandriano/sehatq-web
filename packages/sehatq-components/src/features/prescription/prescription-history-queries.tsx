import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, cleanQuery, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelPrescriptionHistory,
  PrescriptionHistoryResponse,
} from "./prescription-history-model";

type PrescriptionHistoryQuery = {
  prescriptionNo: string;
};

export const prescriptionHistoryKeys = {
  all: ["PRESCRIPTION_HISTORY"],
  details: () => [...prescriptionHistoryKeys.all, "DETAIL"],
  detail: (query: PrescriptionHistoryQuery) => [
    ...prescriptionHistoryKeys.details(),
    cleanQuery(query),
  ],
};

export async function getPrescriptionHistory({
  fetch,
  query,
}: FetcherArgs<PrescriptionHistoryQuery>) {
  const result = await fetch.get<PrescriptionHistoryResponse>(
    `${ENV.API_V2}/tcore/prescription-requests/${query.prescriptionNo}/histories`
  );
  return {
    data: modelPrescriptionHistory(result.data),
  };
}

export type PrescriptionHistoryCache = Awaited<
  ReturnType<typeof getPrescriptionHistory>
>;

export function useGetPrescriptionHistory<TData = PrescriptionHistoryCache>(
  query: PrescriptionHistoryQuery,
  options?: UseQueryOptions<PrescriptionHistoryCache, FetchError, TData>
) {
  return useQuery<PrescriptionHistoryCache, FetchError, TData>(
    prescriptionHistoryKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPrescriptionHistory({ fetch, query });
    },
    options
  );
}
