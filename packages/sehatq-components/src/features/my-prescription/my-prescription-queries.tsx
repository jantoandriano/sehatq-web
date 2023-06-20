import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  queryToString,
  FetchError,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelMyPrescriptions,
  MyPrescriptionsResponse,
  modelMetaMyPrescriptions,
} from "./my-prescription-model";

export type MyPrescriptionQuery = {
  statusFlag: string;
  patientName: string;
};

export const myPrescriptionKeys = {
  all: ["MY_PRESCRIPTION"],
  lists: () => [...myPrescriptionKeys.all, "LISTS"],
  list: (query: MyPrescriptionQuery) => [
    ...myPrescriptionKeys.lists(),
    cleanQuery(query),
  ],
  infiniteLists: () => [...myPrescriptionKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: MyPrescriptionQuery) => [
    ...myPrescriptionKeys.infiniteLists(),
    cleanQuery(query),
  ],
};

export async function getMyPrescriptions({
  fetch,
  query,
}: FetcherArgs<MyPrescriptionQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<MyPrescriptionsResponse>(
    `${ENV.API_V2}/tcore/prescription-requests${queryString}`
  );
  return {
    data: modelMyPrescriptions(result.data),
    meta: modelMetaMyPrescriptions(result.meta),
  };
}

export type MyPrescriptionsCache = Awaited<
  ReturnType<typeof getMyPrescriptions>
>;

export function useGetMyPrescriptions<TData = MyPrescriptionsCache>(
  query: MyPrescriptionQuery,
  options?: UseQueryOptions<MyPrescriptionsCache, FetchError, TData>
) {
  return useQuery<MyPrescriptionsCache, FetchError, TData>(
    myPrescriptionKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyPrescriptions({ fetch, query });
    },
    options
  );
}
