import {
  useInfiniteQuery,
  InfiniteData,
  useQuery,
  useMutation,
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
  CancelMyDoctorAppointmentsResponse,
  modelMyDoctorAppointment,
  modelMyDoctorAppointments,
  MyDoctorAppointmentResponse,
  MyDoctorAppointmentsResponse,
  AttendanceConfirmationMyDoctorAppointmentsResponse,
} from "./my-doctor-appointments-model";

type MyDoctorAppointmentsQuery = {
  userId: string;
};

type MyDoctorAppointmentQuery = {
  bookingId: string;
};

export const MyDoctorAppointmentsKeys = {
  all: ["BOOKING_DOCTORS"],
  lists: () => [...MyDoctorAppointmentsKeys.all, "LISTS"],
  list: (query: MyDoctorAppointmentsQuery) => [
    ...MyDoctorAppointmentsKeys.lists(),
    cleanQuery(query),
  ],
  infiniteLists: () => [...MyDoctorAppointmentsKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: MyDoctorAppointmentsQuery) => [
    ...MyDoctorAppointmentsKeys.infiniteLists(),
    cleanQuery(query),
  ],
  details: () => [...MyDoctorAppointmentsKeys.all, "DETAIL"],
  detail: (query: MyDoctorAppointmentQuery) => [
    ...MyDoctorAppointmentsKeys.details(),
    cleanQuery(query),
  ],
};

export async function getMyDoctorAppointments({
  fetch,
  query,
}: FetcherArgs<MyDoctorAppointmentsQuery>) {
  const queryString = queryToString({
    ...query,
    userId: query.userId !== "all" ? query.userId : "",
  });
  const result = await fetch.get<MyDoctorAppointmentsResponse>(
    `${ENV.API}/booking/list${queryString}`
  );

  return {
    pagination: {
      page: 1,
    },
    data: modelMyDoctorAppointments(result.data),
  };
}

export type BookingDoctorsCache = Awaited<
  ReturnType<typeof getMyDoctorAppointments>
>;

export function useGetMyDoctorAppointments<TData = BookingDoctorsCache>(
  query: MyDoctorAppointmentsQuery,
  options?: UseQueryOptions<BookingDoctorsCache, FetchError, TData>
) {
  return useQuery<BookingDoctorsCache, FetchError, TData>(
    MyDoctorAppointmentsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyDoctorAppointments({ fetch, query });
    },
    options
  );
}

export type InfiniteBookingDoctorsCache = InfiniteData<BookingDoctorsCache>;

export function useGetInfiniteMyDoctorAppointments<
  TData = InfiniteBookingDoctorsCache
>(
  query: MyDoctorAppointmentsQuery,
  options?: UseInfiniteQueryOptions<BookingDoctorsCache, FetchError, TData>
) {
  const result = useInfiniteQuery<BookingDoctorsCache, FetchError, TData>(
    MyDoctorAppointmentsKeys.infiniteList(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyDoctorAppointments({
        fetch,
        query: { ...query },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteBookingDoctorsCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}

export type CancelMyDoctorAppointmentVariables = {
  bookingId: string;
  reasonCancel: string;
};

export async function cancelMyDoctorAppointment(
  variables: CancelMyDoctorAppointmentVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.patch<CancelMyDoctorAppointmentsResponse>(
    `${ENV.API}/booking/doctorbookings/${variables?.bookingId}`,
    { reasonCancel: variables.reasonCancel }
  );
  return {
    message: response.meta.message,
  };
}

type CancelMyDoctorAppointmentReturn = AwaitedReturn<
  typeof cancelMyDoctorAppointment
>;

export function useCancelMyDoctorAppointment() {
  const toast = useToast();
  return useMutation<
    CancelMyDoctorAppointmentReturn,
    FetchError,
    CancelMyDoctorAppointmentVariables
  >(cancelMyDoctorAppointment, {
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

/**
 * Detail MyDoctorAppointment
 */

export async function getMyDoctorAppointment({
  fetch,
  query,
}: FetcherArgs<MyDoctorAppointmentQuery>) {
  const result = await fetch.get<MyDoctorAppointmentResponse>(
    `${ENV.API}/booking/list/${query.bookingId}`
  );
  return modelMyDoctorAppointment(result.data);
}

export type MyDoctorAppointmentCache = AwaitedReturn<
  typeof getMyDoctorAppointment
>;

export function useGetMyDoctorAppointment<TData = MyDoctorAppointmentCache>(
  query: MyDoctorAppointmentQuery,
  options?: UseQueryOptions<MyDoctorAppointmentCache, FetchError, TData>
) {
  return useQuery<MyDoctorAppointmentCache, FetchError, TData>(
    MyDoctorAppointmentsKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMyDoctorAppointment({ fetch, query });
    },
    options
  );
}

/**
 *  Attendance Confirmation
 */

export type AttendanceConfirmationMyDoctorAppointmentVariables = {
  bookingId: string;
  status: string;
};

export async function attendanceConfirmationMyDoctorAppointment(
  variables: AttendanceConfirmationMyDoctorAppointmentVariables
) {
  const fetch = createBrowserFetch();

  const response =
    await fetch.post<AttendanceConfirmationMyDoctorAppointmentsResponse>(
      `${ENV.API}/booking/${variables?.bookingId}/attendance-confirmation`,
      { status: variables.status }
    );
  return {
    message: response.meta.message,
  };
}

type AttendanceConfirmationMyDoctorAppointmentCache = AwaitedReturn<
  typeof attendanceConfirmationMyDoctorAppointment
>;

export function useAttendanceConfirmationMyDoctorAppointment() {
  const toast = useToast();
  const handleToastMessage = (message: string, status: "error" | "success") => {
    toast({
      message,
      status,
    });
  };

  return useMutation<
    AttendanceConfirmationMyDoctorAppointmentCache,
    FetchError,
    AttendanceConfirmationMyDoctorAppointmentVariables
  >(attendanceConfirmationMyDoctorAppointment, {
    onError: ({ message }) => handleToastMessage(message, "error"),
    onSuccess: (data) => handleToastMessage(data.message, "success"),
  });
}
