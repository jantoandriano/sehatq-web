import { FetcherArgs, useToast } from "@sehatq/components";
import { ENV } from "@sehatq/constants";
import {
  AwaitedReturn,
  cleanQuery,
  createBrowserFetch,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { getDecodedToken } from "../../utils/get-decoded-token";
import { modelPrescriptionCart } from "./prescription-cart-model";

export type PrescriptionCartQuery = {
  token: string;
};

export const prescriptionCartKeys = {
  all: ["PRESCRIPTION_CART"],
  lists: () => [...prescriptionCartKeys.all, "LISTS"],
  list: (query: PrescriptionCartQuery) => [
    ...prescriptionCartKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getPrescriptionCart({
  fetch,
  query,
}: FetcherArgs<PrescriptionCartQuery>) {
  const queryString = queryToString(query);
  const { channel } = getDecodedToken();
  const response = await fetch.get(
    `${ENV.API}/tcore/integrations/prescription-requests/cart${queryString}`,
    {
      headers: {
        channel,
      },
    }
  );
  return modelPrescriptionCart(response);
}

export type PrescriptionCartCache = Awaited<
  ReturnType<typeof getPrescriptionCart>
>;

export function useGetPrescriptionCart<TData = PrescriptionCartCache>(
  query: PrescriptionCartQuery,
  options?: UseQueryOptions<PrescriptionCartCache, FetchError, TData>
) {
  return useQuery<PrescriptionCartCache, FetchError, TData>(
    prescriptionCartKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPrescriptionCart({ fetch, query });
    },
    options
  );
}

type UpdatePrescriptionReturn = AwaitedReturn<typeof updateAllPrescriptionCart>;

export type UpdateAllPrescriptionCartVariables = {
  cartId: string;
  selected: boolean;
};

export async function updateAllPrescriptionCart(
  variables: UpdateAllPrescriptionCartVariables
) {
  const fetch = createBrowserFetch();
  const { channel } = getDecodedToken();
  return await fetch.post(
    `${ENV.API}/tcore/cart/select-all`,
    {
      ...variables,
    },
    {
      headers: {
        channel,
      },
    }
  );
}

export function useUpdateAllPrescriptionCart() {
  const toast = useToast();
  return useMutation<
    UpdatePrescriptionReturn,
    FetchError,
    UpdateAllPrescriptionCartVariables
  >(updateAllPrescriptionCart, {
    onError: ({ message }) => {
      toast({ message, status: "error" });
    },
  });
}

export type UpdateMerchantPrescriptionCartVariables = {
  cartId: string;
  merchantIds: number;
  selected: boolean;
};

export async function updateMerchantPrescriptionCart(
  variables: UpdateMerchantPrescriptionCartVariables
) {
  const fetch = createBrowserFetch();
  const { channel } = getDecodedToken();
  return await fetch.post(
    `${ENV.API}/tcore/cart/select-merchants`,
    {
      ...variables,
    },
    {
      headers: {
        channel,
      },
    }
  );
}

export function useUpdateMerchantPrescriptionCart() {
  const toast = useToast();
  return useMutation<
    UpdatePrescriptionReturn,
    FetchError,
    UpdateMerchantPrescriptionCartVariables
  >(updateMerchantPrescriptionCart, {
    onError: ({ message }) => {
      toast({ message, status: "error" });
    },
  });
}

export type UpdateProductPrescriptionCartVariables = {
  cartId: string;
  selected: boolean;
  productMerchantId: number;
  qty: number;
};

export async function updateProductPrescriptionCart(
  variables: UpdateProductPrescriptionCartVariables
) {
  const { productMerchantId, ...restVariables } = variables;
  const fetch = createBrowserFetch();
  const { channel } = getDecodedToken();
  return await fetch.post(
    `${ENV.API}/tcore/cart/product-merchants/${productMerchantId}`,
    {
      ...restVariables,
    },
    {
      headers: {
        channel,
      },
    }
  );
}

export function useUpdateProductPrescriptionCart() {
  const toast = useToast();
  return useMutation<
    UpdatePrescriptionReturn,
    FetchError,
    UpdateProductPrescriptionCartVariables
  >(updateProductPrescriptionCart, {
    onError: ({ message }) => {
      toast({ message, status: "error" });
    },
  });
}

export type CreateClaimVariables = {
  cartId: string;
};

export async function createClaim(variables: CreateClaimVariables) {
  const fetch = createBrowserFetch();
  const { channel } = getDecodedToken();
  return await fetch.post(
    `${ENV.API}/tcore/integrations/prescription-requests/claim`,
    {
      ...variables,
    },
    {
      headers: {
        channel,
      },
    }
  );
}

export function useCreateClaim() {
  const toast = useToast();
  return useMutation(createClaim, {
    onError: ({ message }) => {
      toast({ message, status: "error" });
    },
  });
}
