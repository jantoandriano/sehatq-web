import { useMutation, useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  FetchError,
  cleanQuery,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { useToast } from "../../user-interfaces";
import { FetcherArgs } from "../../types";
import {
  CreateDrugRecommendationResponse,
  DrugRecommendationResponse,
} from "./prescription-model";

type PrescriptionQuery = {
  consultationId: string;
};

export const prescriptionKeys = {
  all: ["PRESCRIPTION"],
  details: () => [...prescriptionKeys.all, "DETAIL"],
  detail: (query: PrescriptionQuery) => [
    ...prescriptionKeys.details(),
    cleanQuery(query),
  ],
};

export async function getPrescription({
  fetch,
  query,
}: FetcherArgs<PrescriptionQuery>) {
  const result = await fetch.get<DrugRecommendationResponse>(
    `${ENV.API}/tcore/prescription-requests/finder?findBy=consultation_id&findQuery=${query.consultationId}`
  );
  return result.data;
}

export type PrescriptionCache = Awaited<ReturnType<typeof getPrescription>>;

export function useGetPrescription<TData = PrescriptionCache>(
  query: PrescriptionQuery,
  options?: UseQueryOptions<PrescriptionCache, FetchError, TData>
) {
  return useQuery<PrescriptionCache, FetchError, TData>(
    prescriptionKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPrescription({ fetch, query });
    },
    options
  );
}

export type CreatePrescriptionVariables = {
  consultationId: string;
  status: string;
};

export async function createPrescription(
  variables: CreatePrescriptionVariables
) {
  const { consultationId, status } = variables;
  const fetch = createBrowserFetch();

  const response = await fetch.patch<CreateDrugRecommendationResponse>(
    `${ENV.API}/telemed-service/consultations/${consultationId}/drug-recommendations`,
    { status }
  );
  return {
    message: response.meta.message,
  };
}

type CreatePrescriptionReturn = AwaitedReturn<typeof createPrescription>;

export function useCreatePrescription() {
  const toast = useToast();
  return useMutation<
    CreatePrescriptionReturn,
    FetchError,
    CreatePrescriptionVariables
  >(createPrescription, {
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
