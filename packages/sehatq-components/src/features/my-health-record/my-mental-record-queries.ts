import { useQuery, UseQueryOptions, useMutation } from "react-query";
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
import {
  modelMyMentalRecords,
  modelMetaMyMentalRecords,
  MyMentalRecordsResponse,
  RemoveMyMentalHealthRecordResponse,
} from "./my-mental-records-model";
import {
  MyMentalRecordResponse,
  modelMyMentalRecord,
} from "./my-mental-record-model";

export type MyMentalRecordsQuery = {
  userId: string;
  dateRange: string;
};

export type MyMentalRecordQuery = {
  mentalId: string;
};

export const myMentalRecordsKeys = {
  all: ["MY_MENTAL_RECORDS"],
  details: () => [...myMentalRecordsKeys.all, "DETAIL"],
  detail: (query: MyMentalRecordQuery) => [
    ...myMentalRecordsKeys.details(),
    cleanQuery(query),
  ],
  lists: () => [...myMentalRecordsKeys.all, "LISTS"],
  list: (query: MyMentalRecordsQuery) => [
    ...myMentalRecordsKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getMyMentalRecords({
  fetch,
  query,
}: FetcherArgs<MyMentalRecordsQuery>) {
  const { ...otherQuery } = query;
  const queryString = queryToString({
    ...otherQuery,
  });
  const result = await fetch.get<MyMentalRecordsResponse>(
    `${ENV.API}/healthtools-service/sehatq/mental-results${queryString}`
  );

  return {
    data: modelMyMentalRecords(result.data),
    meta: modelMetaMyMentalRecords(result.meta),
  };
}

export type MyMentalRecordsCache = AwaitedReturn<typeof getMyMentalRecords>;

export function useGetMyMentalRecords<TData = MyMentalRecordsCache>(
  query: MyMentalRecordsQuery,
  options?: UseQueryOptions<MyMentalRecordsCache, FetchError, TData>
) {
  return useQuery<MyMentalRecordsCache, FetchError, TData>(
    myMentalRecordsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyMentalRecords({ fetch, query });
    },
    options
  );
}

export type RemoveMyMentalRecordVariables = {
  mentalId?: number;
};

export async function removeMyMentalRecord(
  variables: RemoveMyMentalRecordVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.delete<RemoveMyMentalHealthRecordResponse>(
    `${ENV.API}/healthtools-service/sehatq/mental-results/${variables?.mentalId}`,
    {}
  );

  return {
    message: response.meta?.message,
  };
}

type RemoveMyMentalRecordReturn = AwaitedReturn<typeof removeMyMentalRecord>;

export function useRemoveMyMentalRecord() {
  const toast = useToast();
  return useMutation<
    RemoveMyMentalRecordReturn,
    FetchError,
    RemoveMyMentalRecordVariables
  >(removeMyMentalRecord, {
    onError: ({ message }) => {
      toast({
        message,
        status: "error",
      });
    },
    onSuccess: (data) => {
      toast({
        message: data.message,
        status: "success",
      });
    },
  });
}

export async function getMyMentalRecord({
  fetch,
  query,
}: FetcherArgs<MyMentalRecordQuery>) {
  const result = await fetch.get<MyMentalRecordResponse>(
    `${ENV.API}/healthtools-service/sehatq/mental-results/${query?.mentalId}`
  );
  return {
    data: modelMyMentalRecord(result.data),
  };
}

export type MyMentalRecordCache = Awaited<ReturnType<typeof getMyMentalRecord>>;

export function useGetMyMentalRecord<TData = MyMentalRecordCache>(
  query: MyMentalRecordQuery,
  options?: UseQueryOptions<MyMentalRecordCache, FetchError, TData>
) {
  return useQuery<MyMentalRecordCache, FetchError, TData>(
    myMentalRecordsKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyMentalRecord({ fetch, query });
    },
    options
  );
}
