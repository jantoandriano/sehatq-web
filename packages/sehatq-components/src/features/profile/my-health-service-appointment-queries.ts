import {
  useInfiniteQuery,
  InfiniteData,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  queryToString,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { useToast } from "../../user-interfaces";
import { FetcherArgs, UseInfiniteQueryOptions } from "../../types";
import {
  CancelMyHealthServiceAppointmentsResponse,
  modelMyHealthServiceAppointments,
  MyHealthServiceAppointmentsResponse,
  modelMyHealthServiceAppointment,
  MyHealthServiceAppointmentResponse,
} from "./my-health-service-appointment-model";

type MyHealthServiceAppointmentsQuery = {
  userId: string;
  status: string;
  page: string;
  perPage: string;
};

type MyHealthServiceAppointmentQuery = {
  bookingId: string;
};

export const MyHealthServiceAppointmentKeys = {
  all: ["MY_HEALTH_SERVICE_APPOINTMENTS"],
  lists: () => [...MyHealthServiceAppointmentKeys.all, "LISTS"],
  list: (query: MyHealthServiceAppointmentsQuery) => [
    ...MyHealthServiceAppointmentKeys.lists(),
    cleanQuery(query),
  ],
  details: () => [...MyHealthServiceAppointmentKeys.all, "DETAIL"],
  detail: (query: MyHealthServiceAppointmentQuery) => [
    ...MyHealthServiceAppointmentKeys.details(),
    cleanQuery(query),
  ],
  infiniteLists: () => [
    ...MyHealthServiceAppointmentKeys.all,
    "INFINITE_LISTS",
  ],
  infiniteList: (query: MyHealthServiceAppointmentsQuery) => [
    ...MyHealthServiceAppointmentKeys.infiniteLists(),
    cleanQuery(query),
  ],
};

export async function getMyHealthServiceAppointments({
  fetch,
  query,
}: FetcherArgs<MyHealthServiceAppointmentsQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<MyHealthServiceAppointmentsResponse>(
    `${ENV.API}/booking/procedures/list${queryString}`
  );
  return {
    filter: result.meta.filter,
    pagination: result.meta.pagination,
    data: modelMyHealthServiceAppointments(result.data),
  };
}

export type HealthServiceAppointmentsCache = Awaited<
  ReturnType<typeof getMyHealthServiceAppointments>
>;

export function useGetMyHealthServiceAppointments<
  TData = HealthServiceAppointmentsCache
>(
  query: MyHealthServiceAppointmentsQuery,
  options?: UseQueryOptions<HealthServiceAppointmentsCache, FetchError, TData>
) {
  return useQuery<HealthServiceAppointmentsCache, FetchError, TData>(
    MyHealthServiceAppointmentKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyHealthServiceAppointments({ fetch, query });
    },
    options
  );
}

export type InfiniteHealthServiceAppointmentsCache =
  InfiniteData<HealthServiceAppointmentsCache>;

export function useGetInfiniteMyHealthServiceAppointments<
  TData = InfiniteHealthServiceAppointmentsCache
>(
  query: MyHealthServiceAppointmentsQuery,
  options?: UseInfiniteQueryOptions<
    HealthServiceAppointmentsCache,
    FetchError,
    TData
  >
) {
  const result = useInfiniteQuery<
    HealthServiceAppointmentsCache,
    FetchError,
    TData
  >(
    MyHealthServiceAppointmentKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = createBrowserFetch();
      return getMyHealthServiceAppointments({
        fetch,
        query: { ...query, page: pageParam },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteHealthServiceAppointmentsCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}

export async function getMyHealthServiceAppointment({
  fetch,
  query,
}: FetcherArgs<MyHealthServiceAppointmentQuery>) {
  const result = await fetch.get<MyHealthServiceAppointmentResponse>(
    `${ENV.API}/booking/procedures/${query.bookingId}`
  );
  return {
    data: modelMyHealthServiceAppointment(result.data),
  };
}

export type HealthServiceAppointmentCache = Awaited<
  ReturnType<typeof getMyHealthServiceAppointment>
>;

export function useGetMyHealthServiceAppointment<
  TData = HealthServiceAppointmentCache
>(
  query: MyHealthServiceAppointmentQuery,
  options?: UseQueryOptions<HealthServiceAppointmentCache, FetchError, TData>
) {
  return useQuery<HealthServiceAppointmentCache, FetchError, TData>(
    MyHealthServiceAppointmentKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyHealthServiceAppointment({ fetch, query });
    },
    options
  );
}

export type CancelMyHealthServiceAppointmentVariables = {
  bookingId: string;
  reasonCancel: string;
};

export async function cancelMyHealthServiceAppointment(
  variables: CancelMyHealthServiceAppointmentVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.patch<CancelMyHealthServiceAppointmentsResponse>(
    `${ENV.API}/booking/procedures/${variables?.bookingId}`,
    { reasonCancel: variables.reasonCancel }
  );
  return {
    message: response.meta.message,
  };
}

type CancelMyHealthServiceAppointmentReturn = AwaitedReturn<
  typeof cancelMyHealthServiceAppointment
>;

export function useCancelMyHealthServiceAppointment() {
  const toast = useToast();
  return useMutation<
    CancelMyHealthServiceAppointmentReturn,
    FetchError,
    CancelMyHealthServiceAppointmentVariables
  >(cancelMyHealthServiceAppointment, {
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
