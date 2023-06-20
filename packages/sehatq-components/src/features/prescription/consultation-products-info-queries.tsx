import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, cleanQuery, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  ConsultationProductsInfoResponse,
  modelConsultationProductsInfo,
} from "./consultation-products-info-model";

type ConsultationProductsInfoQuery = {
  consultationId: string;
};

export const consultationProductsInfoKeys = {
  all: ["CONSULTATION_PRODUCTS_INFO"],
  lists: () => [...consultationProductsInfoKeys.all, "LISTS"],
  list: (query: ConsultationProductsInfoQuery) => [
    ...consultationProductsInfoKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getConsultationProductsInfo({
  fetch,
  query,
}: FetcherArgs<ConsultationProductsInfoQuery>) {
  const result = await fetch.get<ConsultationProductsInfoResponse>(
    `${ENV.API}/tcore/prescription-requests/consultation/${query.consultationId}`
  );
  return {
    data: modelConsultationProductsInfo(result.data),
  };
}

export type ConsultationProductsInfoCache = Awaited<
  ReturnType<typeof getConsultationProductsInfo>
>;

export function useGetConsultationProductsInfo<
  TData = ConsultationProductsInfoCache
>(
  query: ConsultationProductsInfoQuery,
  options?: UseQueryOptions<ConsultationProductsInfoCache, FetchError, TData>
) {
  return useQuery<ConsultationProductsInfoCache, FetchError, TData>(
    consultationProductsInfoKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getConsultationProductsInfo({ fetch, query });
    },
    options
  );
}
