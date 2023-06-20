import { useQuery, UseQueryOptions } from "react-query";
import {
  FetchError,
  AwaitedReturn,
  getLocationFromBrowser,
} from "@sehatq/utils";

export const myLocationKeys = {
  all: ["MY_LOCATION"],
};

export type MyLocationCache = AwaitedReturn<typeof getLocationFromBrowser>;

export function useGetMyLocation<TData = MyLocationCache>(
  options?: UseQueryOptions<MyLocationCache, FetchError, TData>
) {
  return useQuery<MyLocationCache, FetchError, TData>(
    myLocationKeys.all,
    async () => {
      return getLocationFromBrowser();
    },
    {
      ...options,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
}
