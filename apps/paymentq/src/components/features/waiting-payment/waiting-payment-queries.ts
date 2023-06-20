import { useQuery, UseQueryOptions } from "react-query";
import { cleanQuery } from "@sehatq/utils";
import { ENV, URLS } from "src/constants";
import { createBrowserFetch, FetchError } from "../../../utils/fetch";
import { FetcherArgs } from "../../types/fetcher-args";
import { WaitingPaymentResponse } from "./waiting-payment-types";
import { mappingWaitingPayment } from "./waiting-payment-model";

type WaitingPaymentStatusQuery = {
  coNumber: string;
};

export const waitingPaymentKeys = {
  waitingPayment: ["WAITING_PAYMENT"],
  waitingPaymentStatus: () => [...waitingPaymentKeys.waitingPayment, "STATUS"],
  getStatus: (query: WaitingPaymentStatusQuery) => [
    ...waitingPaymentKeys.waitingPaymentStatus(),
    cleanQuery(query),
  ],
};

export async function getWaitingPaymentStatus({
  fetch,
  query,
}: FetcherArgs<WaitingPaymentStatusQuery>) {
  const result = await fetch.get<WaitingPaymentResponse>(
    `${ENV.API}${URLS.PAYMENTQ.CF_PAYMENT_STATUS}${query.coNumber}`,
    { headers: { Authorization: `Basic ${ENV.TOKEN_BASIC}` } }
  );

  return mappingWaitingPayment(result);
}

export type WaitingPaymentStatusCache = Awaited<
  ReturnType<typeof getWaitingPaymentStatus>
>;

export function useGetWaitingPaymentStatus<TData = WaitingPaymentStatusCache>(
  query: WaitingPaymentStatusQuery,
  options?: UseQueryOptions<WaitingPaymentStatusCache, FetchError, TData>
) {
  return useQuery<WaitingPaymentStatusCache, FetchError, TData>(
    waitingPaymentKeys.getStatus(query),
    async () => {
      const fetch = createBrowserFetch();
      return getWaitingPaymentStatus({ fetch, query });
    },
    {
      retry: false,
      refetchInterval: 10000,
      ...options,
    }
  );
}
