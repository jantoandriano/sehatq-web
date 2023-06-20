import { useQuery, UseQueryOptions } from "react-query";
import { cleanQuery, queryToString } from "@sehatq/utils";
import { ENV, URLS } from "src/constants";
import { createBrowserFetch, FetchError } from "../../../utils/fetch";
import { FetcherArgs } from "../../types/fetcher-args";
import {
  modelPaymentGuidance,
  PaymentGuidanceResponse,
} from "./payment-guidance-model";

type PaymentGuidanceQuery = {
  page?: string;
  perPage?: string;
  orderBy?: string;
  sort?: string;
  search?: string;
  status?: string;
  paymentMethodId: string;
};

export const paymentGuidanceKeys = {
  lists: ["PAYMENT_GUIDANCE"],
  list: () => [...paymentGuidanceKeys.lists, "LIST"],
  getPaymentGuidanceList: (query: PaymentGuidanceQuery) => [
    ...paymentGuidanceKeys.list(),
    cleanQuery(query),
  ],
};

export async function getPaymentGuidances({
  fetch,
  query,
}: FetcherArgs<PaymentGuidanceQuery>) {
  const result = await fetch.get<PaymentGuidanceResponse>(
    `${ENV.API}${URLS.PAYMENTQ.PAYMENT_GUIDANCE}${queryToString(query)}`,
    { headers: { Authorization: `Basic ${ENV.TOKEN_BASIC}` } }
  );

  return modelPaymentGuidance(result.data);
}

export type PaymentGuidanceCache = Awaited<
  ReturnType<typeof getPaymentGuidances>
>;

export function useGetPaymentGuidance<TData = PaymentGuidanceCache>(
  query: PaymentGuidanceQuery,
  options?: UseQueryOptions<PaymentGuidanceCache, FetchError, TData>
) {
  const { data, isLoading, error } = useQuery<
    PaymentGuidanceCache,
    FetchError,
    TData
  >(
    paymentGuidanceKeys.getPaymentGuidanceList(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPaymentGuidances({ fetch, query });
    },
    options
  );

  return {
    dataPaymentGuidance: data,
    isLoadingPaymentGuidance: isLoading,
    errorPaymentGuidance: error,
  };
}
