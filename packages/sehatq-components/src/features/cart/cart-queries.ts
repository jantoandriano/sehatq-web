import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { createBrowserFetch, FetchError, AwaitedReturn } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import { CartResponse, modelCart } from "./cart-model";

export const cartKeys = {
  all: ["CART"],
  details: () => [...cartKeys.all, "DETAILS"],
  detail: () => [...cartKeys.details()],
};

export async function getCart({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<CartResponse>(`${ENV.API}/tcore/cart`);

  return {
    meta: result.meta,
    unavailable: result.unavailable,
    data: modelCart(result.data),
  };
}

export type CartCache = AwaitedReturn<typeof getCart>;

export function useGetCart<TData = CartCache>(
  options?: UseQueryOptions<CartCache, FetchError, TData>
) {
  return useQuery<CartCache, FetchError, TData>(
    cartKeys.detail(),
    async () => {
      const fetch = createBrowserFetch();
      return getCart({ fetch });
    },
    options
  );
}

type RemoveCartVariables = {
  merchantProductId?: number;
};

export async function removeCartProduct(variables: RemoveCartVariables) {
  const fetch = createBrowserFetch();

  const response = await fetch.delete<CartResponse>(
    `${ENV.API}/tcore/cart/product-merchants/${variables?.merchantProductId}?checkout=false&hideUnavailable=true`,
    {}
  );

  return {
    meta: response.meta,
    unavailable: response.unavailable,
    data: modelCart(response.data),
  };
}

type RemoveCartProductReturn = AwaitedReturn<typeof removeCartProduct>;

export function useRemoveCartProduct() {
  const queryClient = useQueryClient();

  async function onMutate(variables: RemoveCartVariables) {
    const cartKey = cartKeys.detail();
    await queryClient.cancelQueries(cartKey);

    const oldCart = getCartData({ queryClient });

    updateCartData({
      queryClient,
      cartData: {
        ...oldCart,
        data: {
          merchants: oldCart.data.merchants,
          products: oldCart.data.products.filter(
            (product) =>
              product.productMerchant.id !== variables.merchantProductId
          ),
        },
      },
    });
    return { oldCart };
  }

  return useMutation<
    RemoveCartProductReturn,
    FetchError,
    RemoveCartVariables,
    AwaitedReturn<typeof onMutate>
  >(removeCartProduct, {
    onMutate,
    onError: (err, variables, context) => {
      if (context) {
        updateCartData({ queryClient, cartData: context.oldCart });
      }
    },
    onSuccess: (removeCartProductResult) => {
      updateCartData({
        queryClient,
        cartData: removeCartProductResult,
      });
    },
  });
}

export function getCartData({ queryClient }: { queryClient: QueryClient }) {
  return (queryClient.getQueryData(cartKeys.detail()) ?? {}) as CartCache;
}

export function updateCartData({
  queryClient,
  cartData,
}: {
  queryClient: QueryClient;
  cartData: CartCache;
}) {
  queryClient.setQueryData(cartKeys.detail(), cartData);
}
