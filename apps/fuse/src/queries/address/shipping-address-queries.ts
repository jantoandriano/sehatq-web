import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient,
} from "react-query";
import { ENV } from "@sehatq/constants";
import {
  createBrowserFetch,
  FetchError,
  AwaitedReturn,
  cleanQuery,
} from "@sehatq/utils";
import { FetcherArgs, OptionalFetcherArgs } from "@sehatq/components/src/types";
import { useToast } from "@sehatq/components";
import { prescriptionCartKeys } from "src/features/prescription-cart";
import { PrescriptionRequestCart } from "@queries/prescription-request-cart/prescription-request-cart-queries";
import { getDecodedToken } from "../../utils/get-decoded-token";

export type ShippingAddress = {
  data: {
    id?: number | string;
    label: string;
    receiver: string;
    address: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    phone: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    note?: string;
    default?: boolean;
    googlePlaceId: number | string;
  };
};

export type ShippingAddresses = {
  data: ShippingAddress["data"][];
};

export type CartShippingAddressVariables = {
  cartId: string;
  id: number;
};

type ShippingAddressQuery = {
  locationId: string;
};

export const shippingAddressKeys = {
  all: ["SHIPPING_ADDRESS"],
  details: () => [...shippingAddressKeys.all, "DETAILS"],
  detail: (query: ShippingAddressQuery) => [
    ...shippingAddressKeys.details(),
    cleanQuery(query),
  ],
  list: () => [...shippingAddressKeys.all, "LIST"],
};

export async function getShippingAddress({
  fetch,
  query,
}: FetcherArgs<ShippingAddressQuery>) {
  const url = `${ENV.API}/tcore/shipping-address/${query.locationId}`;
  return await fetch.get<ShippingAddress>(url);
}

export type ShippingAddressCache = Awaited<
  ReturnType<typeof getShippingAddress>
>;

export function useGetShippingAddress<TData = ShippingAddressCache>(
  query: ShippingAddressQuery,
  options?: UseQueryOptions<ShippingAddressCache, FetchError, TData>
) {
  return useQuery<ShippingAddressCache, FetchError, TData>(
    shippingAddressKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getShippingAddress({ fetch, query });
    },
    options
  );
}

export async function getShippingAddresses({ fetch }: OptionalFetcherArgs) {
  const url = `${ENV.API}/tcore/shipping-address`;
  return await fetch.get<ShippingAddresses>(url);
}

export type ShippingAddressesCache = Awaited<
  ReturnType<typeof getShippingAddresses>
>;

export function useShippingAddresses<TData = ShippingAddressesCache>(
  options?: UseQueryOptions<ShippingAddressesCache, FetchError, TData>
) {
  return useQuery<ShippingAddressesCache, FetchError, TData>(
    shippingAddressKeys.list(),
    async () => {
      const fetch = createBrowserFetch();
      return getShippingAddresses({ fetch });
    },
    options
  );
}

export async function addShippingAddress({
  fetch,
  data,
}: OptionalFetcherArgs & ShippingAddress) {
  const url = `${ENV.API}/tcore/shipping-address`;
  return await fetch.post<ShippingAddress>(url, data);
}

type AddShippingAddressReturn = AwaitedReturn<typeof addShippingAddress>;

export function useAddShippingAddress() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    AddShippingAddressReturn,
    FetchError,
    ShippingAddress["data"]
  >(
    async (data) => {
      const fetch = createBrowserFetch();
      return addShippingAddress({ fetch, data });
    },
    {
      onError: ({ message }) => toast({ message, status: "error" }),
      onSuccess: () => {
        toast({ message: "Success", status: "success" });
        queryClient.invalidateQueries(shippingAddressKeys.list());
      },
    }
  );
}

type UpdateShippingAddressOptions = {
  withoutHeaderChannel: boolean | undefined;
};

export async function updateShippingAddress(
  variables: ShippingAddress["data"],
  options?: UpdateShippingAddressOptions
) {
  const { withoutHeaderChannel } = options ?? {};
  const fetch = createBrowserFetch();
  const url = `${ENV.API}/tcore/shipping-address/${variables.id}`;
  const { channel } = getDecodedToken();
  const config = {
    ...(!withoutHeaderChannel && {
      headers: { channel },
    }),
  };
  return await fetch.post<ShippingAddress>(url, variables, config);
}

type UpdateShippingAddressReturn = AwaitedReturn<typeof updateShippingAddress>;
type UpdateCartShippingAddressReturn = AwaitedReturn<
  typeof updateCartShippingAddress
>;

export function useUpdateShippingAddress(
  options?: UpdateShippingAddressOptions
) {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    UpdateShippingAddressReturn,
    FetchError,
    ShippingAddress["data"]
  >((variables) => updateShippingAddress(variables, options), {
    onError: ({ message }) => toast({ message, status: "error" }),
    onSuccess: () => {
      toast({ message: "Success", status: "success" });
      queryClient.invalidateQueries(shippingAddressKeys.list());
    },
  });
}

export async function updateCartShippingAddress(
  variables: CartShippingAddressVariables
) {
  const url = `${ENV.API}/tcore/cart/shipping-address`;
  const fetch = createBrowserFetch();
  const { channel } = getDecodedToken();
  return await fetch.post<PrescriptionRequestCart>(url, variables, {
    headers: {
      channel,
    },
  });
}

export function useUpdateCartShippingAddress() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    UpdateCartShippingAddressReturn,
    FetchError,
    CartShippingAddressVariables
  >(updateCartShippingAddress, {
    onError: ({ message }) => toast({ message, status: "error" }),
    onSuccess: () => {
      toast({ message: "Success", status: "success" });
      queryClient.invalidateQueries(prescriptionCartKeys.lists());
    },
  });
}
