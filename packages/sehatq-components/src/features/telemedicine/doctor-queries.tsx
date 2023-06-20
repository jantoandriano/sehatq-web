import {
  useInfiniteQuery,
  InfiniteData,
  useQuery,
  UseQueryOptions,
  useMutation,
} from "react-query";
import {
  createBrowserFetch,
  FetchError,
  cleanQuery,
  queryToString,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { useToast } from "../../user-interfaces";

import { FetcherArgs, UseInfiniteQueryOptions } from "../../types";
import {
  TelemedicineDoctorResponse,
  modelTelemedicineDoctor,
  modelTelemedicineDoctors,
  modelMetaTelemedicineDoctors,
  TelemedicineDoctorsResponse,
  BookingTelemedicineHCPScheduleResponse,
} from "./doctor-model";

export type TelemedicineDoctorQuery = {
  doctorId: string;
};

export type TelemedicineDoctorsQuery = {
  page: string;
  perPage: string;
  sort: string;
  userLat: string;
  userLon: string;
  search: string;
  campaignSlug: string;
  city: string;
  doctorExperience: string;
  gender: string;
  price: string;
  specialityId: string;
  hospitalId: string;
};

export const telemedicineDoctorsKeys = {
  all: ["TELEMEDICINE_DOCTORS"],
  lists: () => [...telemedicineDoctorsKeys.all, "LISTS"],
  list: (query: TelemedicineDoctorsQuery) => [
    ...telemedicineDoctorsKeys.lists(),
    cleanQuery(query),
  ],
  infiniteLists: () => [...telemedicineDoctorsKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: TelemedicineDoctorsQuery) => [
    ...telemedicineDoctorsKeys.infiniteLists(),
    cleanQuery(query),
  ],
  details: () => [...telemedicineDoctorsKeys.all, "DETAIL"],
  detail: (query: TelemedicineDoctorQuery) => [
    ...telemedicineDoctorsKeys.details(),
    cleanQuery(query),
  ],
};

export async function getTelemedicineDoctor({
  fetch,
  query,
}: FetcherArgs<TelemedicineDoctorQuery>) {
  const result = await fetch.get<TelemedicineDoctorResponse>(
    `${ENV.API}/telemed-service/doctors/${query?.doctorId}`
  );
  return {
    data: modelTelemedicineDoctor(result.data),
  };
}

export type TelemedicineDoctorCache = Awaited<
  ReturnType<typeof getTelemedicineDoctor>
>;

export function useGetTelemedicineDoctor<TData = TelemedicineDoctorCache>(
  query: TelemedicineDoctorQuery,
  options?: UseQueryOptions<TelemedicineDoctorCache, FetchError, TData>
) {
  return useQuery<TelemedicineDoctorCache, FetchError, TData>(
    telemedicineDoctorsKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedicineDoctor({ fetch, query });
    },
    options
  );
}

export async function getTelemedicineDoctors({
  fetch,
  query,
}: FetcherArgs<TelemedicineDoctorsQuery>) {
  if (query.sort != "nearby") {
    query.userLat = "";
    query.userLon = "";
  }

  const queryString = queryToString({
    ...query,
  });

  const result = await fetch.get<TelemedicineDoctorsResponse>(
    `${ENV.API}/telemed-service/doctors${queryString}`
  );

  return {
    data: modelTelemedicineDoctors(result.data),
    meta: modelMetaTelemedicineDoctors(result.meta),
  };
}

export type TelemedicineDoctorsCache = Awaited<
  ReturnType<typeof getTelemedicineDoctors>
>;

export function useGetTelemedicineDoctors<TData = TelemedicineDoctorsCache>(
  query: TelemedicineDoctorsQuery,
  options?: UseQueryOptions<TelemedicineDoctorsCache, FetchError, TData>
) {
  return useQuery<TelemedicineDoctorsCache, FetchError, TData>(
    telemedicineDoctorsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedicineDoctors({ fetch, query });
    },
    options
  );
}

export type InfiniteTelemedicineDoctorsCache =
  InfiniteData<TelemedicineDoctorsCache>;

export function useGetInfiniteTelemedicineDoctors<
  TData = InfiniteTelemedicineDoctorsCache
>(
  query: TelemedicineDoctorsQuery,
  options?: UseInfiniteQueryOptions<TelemedicineDoctorsCache, FetchError, TData>
) {
  const result = useInfiniteQuery<TelemedicineDoctorsCache, FetchError, TData>(
    telemedicineDoctorsKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = createBrowserFetch();
      return getTelemedicineDoctors({
        fetch,
        query: { ...query, page: pageParam },
      });
    },
    {
      ...options,
      select: options?.select as unknown as (
        data: InfiniteTelemedicineDoctorsCache
      ) => InfiniteData<TData>,
      getNextPageParam: (lastPage) => lastPage.meta.page + 1,
    }
  );
  return {
    ...result,
    data: result.data as unknown as TData,
  };
}

export type BookTelemedicineHCPScheduleVariables = {
  doctorId: number;
  doctorScheduleId: number;
  bookingDate: string;
  doctorRecommendationId?: string;
};

export async function submitBookTelemedicineHCPSchedule(
  variables: BookTelemedicineHCPScheduleVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<BookingTelemedicineHCPScheduleResponse>(
    `${ENV.API}/telemed-service/consultations/checkout`,
    {
      doctorId: variables.doctorId,
      booking: {
        doctorScheduleId: variables.doctorScheduleId,
        bookingDate: variables.bookingDate,
      },
      ...(variables.doctorRecommendationId && {
        doctorRecommendationId: Number(variables.doctorRecommendationId),
      }),
    }
  );
  return {
    message: response.meta.message,
    data: response.data,
  };
}

type BookTelemedicineHCPScheduleReturn = AwaitedReturn<
  typeof submitBookTelemedicineHCPSchedule
>;

export function useSubmitBookTelemedicineHCPSchedule() {
  const toast = useToast();
  return useMutation<
    BookTelemedicineHCPScheduleReturn,
    FetchError,
    BookTelemedicineHCPScheduleVariables
  >(submitBookTelemedicineHCPSchedule, {
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
