import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import {
  AwaitedReturn,
  cleanQuery,
  createBrowserFetch,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs, useToast } from "@sehatq/components";
import { getDecodedToken } from "../../utils/get-decoded-token";
import { modelMerchantShippingMethods } from "./merchant-shipping-method-model";
import { prescriptionCartKeys } from "./prescription-cart-queries";

export type MerchantShippingMethodsQuery = {
  merchantId: string;
  cartId: string;
};

export const merchantShippingMethodsKeys = {
  all: ["MERCHANT_SHIPPING_METHOD"],
  lists: () => [...merchantShippingMethodsKeys.all, "LISTS"],
  list: (query: MerchantShippingMethodsQuery) => [
    ...merchantShippingMethodsKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getMerchantShippingMethods({
  fetch,
  query,
}: FetcherArgs<MerchantShippingMethodsQuery>) {
  const { merchantId, ...otherQuery } = query;
  const queryString = queryToString({ ...otherQuery });
  const { channel } = getDecodedToken();
  const result = await fetch.get(
    `${ENV.API}/tcore/merchants/${merchantId}/shipping-methods${queryString}`,
    { headers: { channel } }
  );

  return {
    data: modelMerchantShippingMethods(result.data),
  };
}

export type MerchantShippingMethodsCache = Awaited<
  ReturnType<typeof getMerchantShippingMethods>
>;

export function useGetMerchantShippingMethods<
  TData = MerchantShippingMethodsCache
>(
  query: MerchantShippingMethodsQuery,
  options?: UseQueryOptions<MerchantShippingMethodsCache, FetchError, TData>
) {
  return useQuery<MerchantShippingMethodsCache, FetchError, TData>(
    merchantShippingMethodsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMerchantShippingMethods({ fetch, query });
    },
    options
  );
}

type CreateShippingMethodReturn = AwaitedReturn<typeof createShippingMethod>;

export type CreateShippingMethodVariables = {
  cartId: string;
  merchantId: number;
  shippingMethodId: number;
};

export async function createShippingMethod(
  variables: CreateShippingMethodVariables
) {
  const fetch = createBrowserFetch();
  const { channel } = getDecodedToken();
  return await fetch.post(
    `${ENV.API}/tcore/cart/shipping-method`,
    { ...variables },
    { headers: { channel } }
  );
}

export function useCreateShippingMethod() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    CreateShippingMethodReturn,
    FetchError,
    CreateShippingMethodVariables
  >(createShippingMethod, {
    onError: ({ message }) => {
      toast({ message, status: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(prescriptionCartKeys.lists());
    },
  });
}

type UpdateShippingMethodInsuranceReturn = AwaitedReturn<
  typeof updateShippingMethodInsurance
>;

export type UpdateShippingMethodInsuranceVariables = {
  cartId: string;
  merchantId: number;
  selected: boolean;
};

export async function updateShippingMethodInsurance(
  variables: UpdateShippingMethodInsuranceVariables
) {
  const fetch = createBrowserFetch();
  const { channel } = getDecodedToken();
  return await fetch.post(
    `${ENV.API}/tcore/cart/shipping-insurance`,
    { ...variables },
    { headers: { channel } }
  );
}

export function useUpdateShippingMethodInsurance() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    UpdateShippingMethodInsuranceReturn,
    FetchError,
    UpdateShippingMethodInsuranceVariables
  >(updateShippingMethodInsurance, {
    onError: ({ message }) => {
      toast({ message, status: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(prescriptionCartKeys.lists());
    },
  });
}
