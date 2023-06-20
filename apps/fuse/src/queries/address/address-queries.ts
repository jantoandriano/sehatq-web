import { useQuery, UseQueryOptions } from "react-query";
import { ENV } from "@sehatq/constants";
import { cleanQuery, createBrowserFetch, FetchError } from "@sehatq/utils";
import { FetcherArgs } from "@sehatq/components/src/types";

export type Address = {
  data: {
    address: string;
    city?: string;
    country?: string;
    description: string;
    district?: string;
    latitude: number;
    localPlaceId?: number;
    longitude: number;
    placeId: string;
    province?: string;
    subDistrict?: string;
    zipCode?: string;
  };
};

export type Addresses = {
  data: {
    description: string;
    placeId: string;
  }[];
};

type AddressQuery = {
  placeId: string;
};

type AddressesQuery = {
  search: string;
};

export const addressKeys = {
  all: ["ADDRESS"],
  details: () => [...addressKeys.all, "DETAILS"],
  detail: (query: AddressQuery) => [
    ...addressKeys.details(),
    cleanQuery(query),
  ],
  lists: () => [...addressKeys.all, "LISTS"],
  list: (query: AddressesQuery) => [...addressKeys.lists(), cleanQuery(query)],
};

export async function getAddress({ fetch, query }: FetcherArgs<AddressQuery>) {
  const url = `${ENV.API}/tcore/places/${query.placeId}`;
  return await fetch.get<Address>(url);
}

export type AddressCache = Awaited<ReturnType<typeof getAddress>>;

export function useAddress<TData = AddressCache>(
  query: AddressQuery,
  options?: UseQueryOptions<AddressCache, FetchError, TData>
) {
  return useQuery<AddressCache, FetchError, TData>(
    addressKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getAddress({ fetch, query });
    },
    options
  );
}

export async function getAddresses({
  fetch,
  query,
}: FetcherArgs<AddressesQuery>) {
  const url = `${ENV.API}/tcore/place/autocomplete?input=${query.search}`;
  return await fetch.get<Addresses>(url);
}

export type AddressesCache = Awaited<ReturnType<typeof getAddresses>>;

export function useAddresses<TData = AddressesCache>(
  query: AddressesQuery,
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
