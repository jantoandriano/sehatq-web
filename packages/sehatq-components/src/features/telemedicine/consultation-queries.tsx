import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient,
  QueryClient,
} from "react-query";
import {
  createBrowserFetch,
  FetchError,
  cleanQuery,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { useToast } from "../../user-interfaces";
import { FetcherArgs } from "../../types";
import { ToastArgs } from "../../user-interfaces/use-toast";
import { myTelemedicineKeys } from "../profile/my-telemedicine-queries";
import {
  ConsultationResponse,
  modelConsultation,
  UpdateConsultationResponse,
  ConsultationRatingResponse,
  SubmitConsultationResponse,
  UpdateConsultationDoctorRecommendationResponse,
  ConsultationStatus,
  ConsultationCheckoutResponse,
} from "./consultation-model";
import { myBookedTelemedicinesKeys } from "./my-booked-telemedicine-queries";

export type ConsultationQuery = {
  consultationId: string;
};

export const consultationsKeys = {
  all: ["CONSULTATIONS"],
  details: () => [...consultationsKeys.all, "DETAIL"],
  detail: (query: ConsultationQuery) => [
    ...consultationsKeys.details(),
    cleanQuery(query),
  ],
};

export async function getConsultation({
  fetch,
  query,
}: FetcherArgs<ConsultationQuery>) {
  const result = await fetch.get<ConsultationResponse>(
    `${ENV.API}/telemed-service/consultations/${query?.consultationId}`
  );
  return {
    data: modelConsultation(result.data),
  };
}

export type ConsultationCache = Awaited<ReturnType<typeof getConsultation>>;

export function useGetConsultation<TData = ConsultationCache>(
  query: ConsultationQuery,
  options?: UseQueryOptions<ConsultationCache, FetchError, TData>
) {
  return useQuery<ConsultationCache, FetchError, TData>(
    consultationsKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getConsultation({ fetch, query });
    },
    options
  );
}

/**
 * Handle Update Consultation
 */
export type UpdateConsultationVariables = {
  consultationId: string;
  status: ConsultationStatus;
};

export async function updateConsultation(
  variables: UpdateConsultationVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<UpdateConsultationResponse>(
    `${ENV.API}/telemed-service/consultations/${variables.consultationId}`,
    { status: variables.status }
  );
  return {
    message: response.meta.message,
  };
}

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

type UpdateConsultationReturn = AwaitedReturn<typeof updateConsultation>;

function updateConsultationCache(
  queryClient: QueryClient,
  consultationId: string,
  updater: (old: ConsultationCache) => ConsultationCache
) {
  const consultationKey = consultationsKeys.detail({
    consultationId,
  });
  const old = queryClient.getQueryData<ConsultationCache>(consultationKey);
  if (old) {
    queryClient.setQueryData<ConsultationCache>(consultationKey, updater(old));
  }
}

export function useUpdateConsultation() {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation<
    UpdateConsultationReturn,
    FetchError,
    UpdateConsultationVariables
  >(updateConsultation, {
    onError: ({ message }) =>
      handleToastMessage(toast, message, "error", "update-consultation"),
    onSuccess: (data, variables) => {
      updateConsultationCache(queryClient, variables.consultationId, (old) => ({
        ...old,
        data: {
          ...old.data,
          status: variables.status,
        },
      }));
      queryClient.invalidateQueries(myTelemedicineKeys.latest());
      handleToastMessage(toast, data.message, "success");
    },
  });
}

/**
 * Handle Consultation Rating
 */
export type SubmitConsultationRatingVariables = {
  consultationId: string;
  rating: number;
  tags?: string[];
  review?: string;
};

export async function submitConsultationRating(
  variables: SubmitConsultationRatingVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<ConsultationRatingResponse>(
    `${ENV.API}/telemed-service/consultations/${variables.consultationId}/rating`,
    { rating: variables.rating, tags: variables.tags, review: variables.review }
  );
  return {
    message: response.meta.message,
  };
}

type SubmitConsultationRatingReturn = AwaitedReturn<
  typeof submitConsultationRating
>;

export function useSubmitConsultationRating() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    SubmitConsultationRatingReturn,
    FetchError,
    SubmitConsultationRatingVariables
  >(submitConsultationRating, {
    onError: ({ message }) =>
      handleToastMessage(toast, message, "error", "rate-consultation"),
    onSuccess: (data, variables) => {
      updateConsultationCache(queryClient, variables.consultationId, (old) => ({
        ...old,
        data: {
          ...old.data,
          screen: "closed",
        },
      }));
      queryClient.invalidateQueries(myTelemedicineKeys.latest());
      handleToastMessage(toast, data.message, "success");
    },
  });
}

export type SubmitConsultationVariables = {
  phone: string;
  userId: number;
  gender: string;
  symptom: string;
  birthDate: string;
  allergies: string;
  ethicalDrug: string;
  historyDisease: string;
  age?: number;
  height?: number;
  weight?: number;
  address?: string;
  userPhotoUrl?: string;
  identityNumber?: string;
  consultationId?: string;
  status?: "initToPending";
  type?: string;
  drug?: {
    tokoId: number;
    name: string;
    qty: number;
  };
};

export async function submitConsultation(
  variables: SubmitConsultationVariables
) {
  const fetch = createBrowserFetch();
  const response = await fetch.post<SubmitConsultationResponse>(
    variables.consultationId
      ? `${ENV.API}/telemed-service/consultations/${variables.consultationId}`
      : `${ENV.API}/telemed-service/consultations`,
    { ...variables }
  );
  return {
    message: response.meta.message,
    consultationId: response.data.id,
    paymentPageUrl: response.data.paymentPageUrl,
  };
}

type SubmitConsultationReturn = AwaitedReturn<typeof submitConsultation>;

export function useSubmitConsultation() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    SubmitConsultationReturn,
    FetchError,
    SubmitConsultationVariables
  >(submitConsultation, {
    onError: ({ message }) =>
      handleToastMessage(toast, message, "error", "create-consultation"),
    onSuccess: (data) => {
      queryClient.invalidateQueries(myTelemedicineKeys.latest());
      queryClient.invalidateQueries(myBookedTelemedicinesKeys.all);
      handleToastMessage(toast, data.message, "success");
    },
  });
}

/**
 * Handle Consultation Checkout
 */
export type SubmitConsultationCheckoutVariables = {
  doctorId: number;
  booking?: {
    doctorScheduleId: number;
    bookingDate: string;
  };
  doctorRecommendationId?: string;
};

export async function submitConsultationCheckout(
  variables: SubmitConsultationCheckoutVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<ConsultationCheckoutResponse>(
    `${ENV.API}/telemed-service/consultations/checkout`,
    {
      doctorId: variables.doctorId,
      booking: variables.booking,
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

type SubmitConsultationCheckoutReturn = AwaitedReturn<
  typeof submitConsultationCheckout
>;

export function useSubmitConsultationCheckout() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    SubmitConsultationCheckoutReturn,
    FetchError,
    SubmitConsultationCheckoutVariables
  >(submitConsultationCheckout, {
    onError: (response) => {
      toast({
        message: response.message,
        status: "error",
      });
    },
    onSuccess: () => queryClient.invalidateQueries(myTelemedicineKeys.latest()),
  });
}

/**
 * Handle Update Doctor Chat Recommendation
 */
export type UpdateConsultationDoctorRecommendation = {
  consultationId: string;
  doctorRecommendationId: string;
  status: string;
};

export async function updateConsultationDoctorRecommendation(
  variables: UpdateConsultationDoctorRecommendation
) {
  const fetch = createBrowserFetch();

  const response =
    await fetch.patch<UpdateConsultationDoctorRecommendationResponse>(
      `${ENV.API}/telemed-service/consultations/${variables.consultationId}/doctor-recommendations/${variables.doctorRecommendationId}`,
      { status: variables.status }
    );
  return {
    message: response.meta.message,
    data: response.data,
  };
}

type UpdateConsultationDoctorRecommendationReturn = AwaitedReturn<
  typeof updateConsultationDoctorRecommendation
>;

export function useUpdateConsultationDoctorRecommendation() {
  const toast = useToast();
  return useMutation<
    UpdateConsultationDoctorRecommendationReturn,
    FetchError,
    UpdateConsultationDoctorRecommendation
  >(updateConsultationDoctorRecommendation, {
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
