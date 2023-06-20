import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import {
  cleanQuery,
  createBrowserFetch,
  FetchError,
  AwaitedReturn,
} from "@sehatq/utils";
import { FetcherArgs, OptionalFetcherArgs } from "@sehatq/components/src/types";
import { modelConsultation } from "@sehatq/components/src/features";
import { useToast } from "@sehatq/components";
import { ENV } from "@sehatq/constants";
import {
  ConsultationStatus,
  UpdateConsultationResponse,
} from "@sehatq/components/src/features/telemedicine/consultation-model";
import { ToastArgs } from "@sehatq/components/src/user-interfaces/use-toast";
import { modelLatestConsultation } from "./consultation-model";

export type CreateConsultationVariables = {
  userId?: number;
  userPhotoUrl?: string;
  gender?: string;
  height?: number;
  weight?: number;
  symptom?: string;
  birthDate?: string;
  identityNumber?: string;
  type?: string;
  appChannel?: string;
};

export interface CreateConsultationResponse {
  meta: { message: string };
  data: {
    id: number;
    expireAt: string;
    status: string;
    paymentPageUrl: string;
    waitingEndAt: string;
  };
}

export async function createConsultation(
  variables: CreateConsultationVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<CreateConsultationResponse>(
    `${ENV.API}/telemed-service/b2b/consultations`,
    variables
  );
  return {
    message: response.meta.message,
    data: response.data,
  };
}

type CreateConsultationReturn = AwaitedReturn<typeof createConsultation>;

export function useCreateConsultation() {
  const toast = useToast();
  return useMutation<
    CreateConsultationReturn,
    FetchError,
    CreateConsultationVariables
  >(createConsultation, {
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

type ConsultationQuery = {
  consultationId: string;
};

export const chatKeys = {
  all: ["CHAT"],
  details: () => [...chatKeys.all, "DETAILS"],
  detail: (query: ConsultationQuery) => [
    ...chatKeys.details(),
    cleanQuery(query),
  ],
  latest: () => [...chatKeys.all, "LATEST"],
};

export async function getConsultation({
  fetch,
  query,
}: FetcherArgs<ConsultationQuery>) {
  const response = await fetch.get(
    `${ENV.API}/telemed-service/b2b/consultations/${query.consultationId}`
  );
  return {
    data: modelConsultation(response.data),
  };
}

export type ConsultationCache = Awaited<ReturnType<typeof getConsultation>>;

export function useGetConsultation<TData = ConsultationCache>(
  query: ConsultationQuery,
  options?: UseQueryOptions<ConsultationCache, FetchError, TData>
) {
  return useQuery<ConsultationCache, FetchError, TData>(
    chatKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getConsultation({ fetch, query });
    },
    options
  );
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

export type UpdateConsultationVariables = {
  consultationId: string;
  status: ConsultationStatus;
};

export async function updateConsultation(
  variables: UpdateConsultationVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.put<UpdateConsultationResponse>(
    `${ENV.API}/telemed-service/b2b/consultations/${variables.consultationId}`,
    { status: variables.status }
  );
  return {
    message: response.meta.message,
  };
}

type UpdateConsultationReturn = AwaitedReturn<typeof updateConsultation>;

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
      queryClient.invalidateQueries(
        chatKeys.detail({ consultationId: variables.consultationId })
      );
      handleToastMessage(toast, data.message, "success");
    },
  });
}

export async function getLatestConsultation({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get(
    `${ENV.API}/telemed-service/b2b/consultations-latest`
  );
  return modelLatestConsultation(result.data);
}

export type LatestConsultationCache = Awaited<
  ReturnType<typeof getLatestConsultation>
>;

export function useGetLatestConsultation<TData = LatestConsultationCache>(
  options?: UseQueryOptions<LatestConsultationCache, FetchError, TData>
) {
  return useQuery<LatestConsultationCache, FetchError, TData>(
    chatKeys.latest(),
    async () => {
      const fetch = createBrowserFetch();
      return getLatestConsultation({ fetch });
    },
    options
  );
}

export type UpdateDrugRecommendationResponse = {
  meta: {
    message: string;
  };
  data: {
    nextScreen: string;
  };
};

export type UpdateDrugRecommendationVariables = {
  consultationId: string;
  status: string;
};

export async function updateDrugRecommendation(
  variables: UpdateDrugRecommendationVariables
) {
  const fetch = createBrowserFetch();
  const url = `${ENV.API}/telemed-service/consultations/${variables.consultationId}/drug-recommendations`;
  return await fetch.patch<UpdateDrugRecommendationResponse>(url, {
    status: variables.status,
  });
}

type UpdateDrugRecommendationReturn = AwaitedReturn<
  typeof updateDrugRecommendation
>;

export function useUpdateDrugRecommendation() {
  const toast = useToast();
  return useMutation<
    UpdateDrugRecommendationReturn,
    FetchError,
    UpdateDrugRecommendationVariables
  >(updateDrugRecommendation, {
    onError: (error) =>
      handleToastMessage(
        toast,
        error.message,
        "error",
        "update-drug-recommendation"
      ),
    onSuccess: (data) =>
      handleToastMessage(toast, data.meta.message, "success"),
  });
}
