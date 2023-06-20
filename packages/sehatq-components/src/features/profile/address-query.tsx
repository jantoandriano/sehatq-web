import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient,
} from "react-query";
import {
  createBrowserFetch,
  FetchError,
  cleanQuery,
  queryToString,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import { useToast } from "../../user-interfaces";
import { ToastArgs } from "../../user-interfaces/use-toast";
import {
  AddressDetailResponse,
  AddressesResponse,
  AddressSubmitResponse,
  modelAddressDetail,
  modelAddresses,
} from "./address-model";

export type AddressQuery = {
  query: string;
};

export type AddressDeleteQuery = {
  addressId: string;
};

export type AddressDetailQuery = {
  addressId: string;
};

function handleToastMessage(
  toast: ({ id, title, message, status }: ToastArgs) => void,
  msg: string,
  status: "error" | "success",
  id?: string
) {
  toast({
    message: msg,
    status,
    id,
  });
}

export const addressKeys = {
  all: ["ADDRESS"],
  lists: () => [...addressKeys.all, "LISTS"],
  list: (query: AddressQuery) => [...addressKeys.lists(), cleanQuery(query)],
  infiniteLists: () => [...addressKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: AddressQuery) => [
    ...addressKeys.infiniteLists(),
    cleanQuery(query),
  ],
  details: () => [...addressKeys.all, "DETAIL"],
  detail: (query: AddressDetailQuery) => [
    ...addressKeys.details(),
    cleanQuery(query),
  ],
};

export async function getAddresses({
  fetch,
  query,
}: FetcherArgs<AddressQuery>) {
  const { ...otherQuery } = query;
  const queryString = queryToString({
    ...otherQuery,
  });
  const result = await fetch.get<AddressesResponse>(
    `${ENV.API}/tcore/shipping-address${queryString}`
  );
  return { data: modelAddresses(result.data), meta: result.meta };
}

export async function deleteAddress(variables: AddressDeleteQuery) {
  const fetch = createBrowserFetch();

  const response = await fetch.delete<{ meta: { message: string } }>(
    `${ENV.API}/tcore/shipping-address/${variables.addressId}`
  );
  return {
    message: response.meta.message,
  };
}

export type AddressesCache = AwaitedReturn<typeof getAddresses>;

export function useGetAddresses<TData = AddressesCache>(
  query: AddressQuery,
  options?: UseQueryOptions<AddressesCache, FetchError, TData>
) {
  return useQuery<AddressesCache, FetchError, TData>(
    addressKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getAddresses({ fetch, query });
    },
    options
  );
}

type DeleteAddressReturn = AwaitedReturn<typeof deleteAddress>;
export function useDeleteAddress() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<DeleteAddressReturn, FetchError, AddressDeleteQuery>(
    deleteAddress,
    {
      onError: ({ message }) => handleToastMessage(toast, message, "error"),
      onSuccess: ({ message }) => {
        queryClient.invalidateQueries(addressKeys.all);
        handleToastMessage(toast, message, "success");
      },
    }
  );
}

export async function getAddressDetail({
  fetch,
  query,
}: FetcherArgs<AddressDetailQuery>) {
  const result = await fetch.get<AddressDetailResponse>(
    `${ENV.API}/tcore/shipping-address/${query.addressId}`
  );
  return { data: modelAddressDetail(result.data) };
}

export type AddressDetailCache = AwaitedReturn<typeof getAddressDetail>;

export function useGetAddressDetail<TData = AddressDetailCache>(
  query: AddressDetailQuery,
  options?: UseQueryOptions<AddressDetailCache, FetchError, TData>
) {
  return useQuery<AddressDetailCache, FetchError, TData>(
    addressKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getAddressDetail({ fetch, query });
    },
    options
  );
}

export type SubmitShippingAddressVariables = {
  id?: number;
  label: string;
  receiver: string;
  address: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  phone: string;
  latitude?: string | null;
  longitude?: string | null;
  note?: string | null;
  zipCode: string;
  default: boolean;
  googlePlaceId?: string | null;
};

export async function submitShippingAddress(
  variables: SubmitShippingAddressVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<AddressSubmitResponse>(
    `${ENV.API}/tcore/shipping-address${
      variables.id ? "/" + variables.id : ""
    }`,
    { ...variables }
  );
  return {
    message: response.meta.message,
    data: modelAddressDetail(response.data),
  };
}

type SubmitShippingAddressReturn = AwaitedReturn<typeof submitShippingAddress>;

export function useSubmitShippingAddress() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    SubmitShippingAddressReturn,
    FetchError,
    SubmitShippingAddressVariables
  >(submitShippingAddress, {
    onError: ({ message }) => {
      handleToastMessage(toast, message, "error");
    },
    onSuccess: (data) => {
      handleToastMessage(toast, data.message, "success");
      queryClient.invalidateQueries(addressKeys.all);
    },
  });
}
