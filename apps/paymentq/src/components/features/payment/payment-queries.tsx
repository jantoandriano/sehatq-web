import { useQuery, UseQueryOptions, useMutation } from "react-query";
import { FetcherArgs } from "@sehatq/components";
import { cleanQuery, queryToString, AwaitedReturn } from "@sehatq/utils";
import { createBrowserFetch, FetchError } from "@utils";
import { ENV } from "@constants";
import {
  modelPaymentMethodList,
  PaymentMethodListResponse,
  modelPaymentCheckoutVerify,
  PaymentCheckoutVerifyResponse,
  ResponsePurchase,
  LastTransactionResponse,
  ResponsePaymentCheckLimit,
  PaymentCheckLimitBody,
} from "./payment-model";

type PaymentMethodListQuery = {
  page: string;
  perPage: string;
  orderBy: string;
  sort: string;
  domain: string;
  productType: string;
  orderAmount: string;
  slug: string;
  coNumber: string;
  status: string;
  excess?: string;
};
type PaymentCheckoutVerifyQuery = {
  token: string;
};
export type CreatePurchaseBody = {
  coNumber: string;
  paymentMethod:
    | {
        id: number | string;
        name: string;
        amount: number;
        adminFee: number;
      }[]
    | undefined;
  cc?: {
    token: string;
    installmentPeriod?: number;
    installmentId?: number;
  };
  phoneNumber?: string;
};
type LastTransactionQuery = {
  uuid: string;
  paymentMethodId: number;
};

export const paymentMethodKeys = {
  all: ["PAYMENT"],
  lists: () => [...paymentMethodKeys.all, "LISTS"],
  list: (query: PaymentMethodListQuery) => [
    ...paymentMethodKeys.lists(),
    cleanQuery(query),
  ],
};
export const paymentCheckoutKeys = {
  all: ["PAYMENT_CHECKOUT"],
  lists: () => [...paymentCheckoutKeys.all, "LISTS"],
  list: (query: PaymentCheckoutVerifyQuery) => [
    ...paymentCheckoutKeys.lists(),
    cleanQuery(query),
  ],
};
export const lastTransactionKey = {
  all: ["LAST_TRANSACTION"],
  lists: () => [...paymentCheckoutKeys.all, "LISTS"],
  list: (query: LastTransactionQuery) => [
    ...lastTransactionKey.lists(),
    cleanQuery(query),
  ],
};

export async function getPaymentMethodList({
  fetch,
  query,
}: FetcherArgs<PaymentMethodListQuery>) {
  const result = await fetch.get<PaymentMethodListResponse>(
    `${ENV.API}/v1/payment-service/cf/payment-options${queryToString(query)}`,
    { headers: { Authorization: `Basic ${ENV.TOKEN_BASIC}` } }
  );
  return {
    data: modelPaymentMethodList(result),
  };
}
export type PaymentMethodListCache = Awaited<
  ReturnType<typeof getPaymentMethodList>
>;
export function useGetPaymentMethodList<TData = PaymentMethodListCache>(
  query: PaymentMethodListQuery,
  options?: UseQueryOptions<PaymentMethodListCache, FetchError, TData>
) {
  return useQuery<PaymentMethodListCache, FetchError, TData>(
    paymentMethodKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPaymentMethodList({ fetch, query });
    },
    options
  );
}

export async function getPaymentCheckoutVerify({
  fetch,
  query,
}: FetcherArgs<PaymentCheckoutVerifyQuery>) {
  const result = await fetch.post<PaymentCheckoutVerifyResponse>(
    `${ENV.API}/v1/payment-service/cf/payment-checkout/verify`,
    query,
    { headers: { Authorization: `Basic ${ENV.TOKEN_BASIC}` } }
  );
  return {
    data: modelPaymentCheckoutVerify(result),
  };
}
export type PaymentCheckoutVerifyCache = Awaited<
  ReturnType<typeof getPaymentCheckoutVerify>
>;
export function useGetPaymentCheckoutVerify<TData = PaymentCheckoutVerifyCache>(
  query: PaymentCheckoutVerifyQuery,
  options?: UseQueryOptions<PaymentCheckoutVerifyCache, FetchError, TData>
) {
  return useQuery<PaymentCheckoutVerifyCache, FetchError, TData>(
    paymentCheckoutKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPaymentCheckoutVerify({ fetch, query });
    },
    options
  );
}

export async function createPurchase(body: CreatePurchaseBody) {
  const fetch = createBrowserFetch();
  return await fetch.post<ResponsePurchase>(
    `${ENV.API}/v1/payment-service/cf/purchase`,
    body,
    { headers: { Authorization: `Basic ${ENV.TOKEN_BASIC}` } }
  );
}
type CreatePurchaseReturn = AwaitedReturn<typeof createPurchase>;
export function useCreatePurchase() {
  return useMutation<CreatePurchaseReturn, FetchError, CreatePurchaseBody>(
    createPurchase
  );
}

export async function getLastTransaction({
  fetch,
  query,
}: FetcherArgs<LastTransactionQuery>) {
  const result = await fetch.post<LastTransactionResponse>(
    `${ENV.API}/v1/payment-service/cf/last-transaction`,
    { ...query },
    { headers: { Authorization: `Basic ${ENV.TOKEN_BASIC}` } }
  );

  return {
    data: result,
  };
}

export type GetLastTransactionCache = Awaited<
  ReturnType<typeof getLastTransaction>
>;

export function useGetLastTransaction<TData = GetLastTransactionCache>(
  query: LastTransactionQuery,
  options?: UseQueryOptions<GetLastTransactionCache, FetchError, TData>
) {
  return useQuery<GetLastTransactionCache, FetchError, TData>(
    lastTransactionKey.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getLastTransaction({ fetch, query });
    },
    options
  );
}

export async function getPaymentCheckLimit(body: PaymentCheckLimitBody) {
  const fetch = createBrowserFetch();
  return await fetch.post<ResponsePaymentCheckLimit>(
    `${ENV.API}/v1/payment-service/cf/check-limit`,
    body,
    { headers: { Authorization: `Basic ${ENV.TOKEN_BASIC}` } }
  );
}
export type PaymentCheckLimitCache = AwaitedReturn<typeof getPaymentCheckLimit>;
export function useGetPaymentCheckLimit() {
  return useMutation<PaymentCheckLimitCache, FetchError, PaymentCheckLimitBody>(
    getPaymentCheckLimit
  );
}
