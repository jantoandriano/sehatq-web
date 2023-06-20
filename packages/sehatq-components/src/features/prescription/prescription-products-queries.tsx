import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, cleanQuery, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelPrescriptionProducts,
  PrescriptionProductsResponse,
} from "./prescription-products-model";

export type PrescriptionProductsQuery = {
  prescriptionNo: string;
};

export const prescriptionProductsKeys = {
  all: ["PRESCRIPTION_PRODUCTS"],
  lists: () => [...prescriptionProductsKeys.all, "LISTS"],
  list: (query: PrescriptionProductsQuery) => [
    ...prescriptionProductsKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getPrescriptionProducts({
  fetch,
  query,
}: FetcherArgs<PrescriptionProductsQuery>) {
  const result = await fetch.get<PrescriptionProductsResponse>(
    `${ENV.API_V2}/tcore/prescription-requests/${query.prescriptionNo}/products`
  );
  return {
    data: modelPrescriptionProducts(result.data),
  };
}

export type PrescriptionProductsCache = Awaited<
  ReturnType<typeof getPrescriptionProducts>
>;

export function useGetPrescriptionProducts<TData = PrescriptionProductsCache>(
  query: PrescriptionProductsQuery,
  options?: UseQueryOptions<PrescriptionProductsCache, FetchError, TData>
) {
  return useQuery<PrescriptionProductsCache, FetchError, TData>(
    prescriptionProductsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPrescriptionProducts({ fetch, query });
    },
    options
  );
}
