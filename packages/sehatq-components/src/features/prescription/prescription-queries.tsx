import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  QueryClient,
} from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  AwaitedReturn,
  useNavigation,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import { useToast } from "../../user-interfaces";
import {
  modelPrescription,
  modelSubmitPrescription,
  PrescriptionResponse,
  PrescriptionSubmitResponse,
  CancelPrescriptionResponse,
  RecreatePrescriptionResponse,
  CreatePrescriptionCartResponse,
} from "./prescription-model";

type PrescriptionQuery = {
  prescriptionNo: string;
};

export const prescriptionKeys = {
  all: ["PRESCRIPTIONS"],
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
  const result = await fetch.get<PrescriptionResponse>(
    `${ENV.API_V2}/tcore/prescription-requests/${query.prescriptionNo}`
  );
  return {
    data: modelPrescription(result.data),
  };
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

function invalidPrescriptionCache(
  queryClient: QueryClient,
  prescriptionNo: string
) {
  queryClient.invalidateQueries(prescriptionKeys.detail({ prescriptionNo }));
}

export type CancelPrescriptionVariables = {
  prescriptionNo: string;
  prescriptionId: number;
};

export async function cancelPrescription(
  variables: CancelPrescriptionVariables
) {
  const fetch = createBrowserFetch();
  return await fetch.put<CancelPrescriptionResponse>(
    `${ENV.API}/tcore/prescription-requests/${variables.prescriptionId}/cancel`
  );
}

type CancelPrescriptionReturn = AwaitedReturn<typeof cancelPrescription>;

export function useCancelPrescription() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    CancelPrescriptionReturn,
    FetchError,
    CancelPrescriptionVariables
  >(cancelPrescription, {
    onSuccess: (data, { prescriptionNo }) => {
      invalidPrescriptionCache(queryClient, prescriptionNo);
    },
    onError: ({ message }) => {
      toast({ message, status: "error" });
    },
  });
}

export type CreatePrescriptionCartVariables = {
  prescriptionNo: string;
  prescriptionId: number;
};

export async function createPrescriptionCart(
  variables: CreatePrescriptionCartVariables
) {
  const fetch = createBrowserFetch();
  return await fetch.post<CreatePrescriptionCartResponse>(
    `${ENV.API}/tcore/prescription-requests/${variables.prescriptionId}/create-cart`
  );
}

type CreatePrescriptionCartReturn = AwaitedReturn<
  typeof createPrescriptionCart
>;

export function useCreatePrescriptionCart() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    CreatePrescriptionCartReturn,
    FetchError,
    CreatePrescriptionCartVariables
  >(createPrescriptionCart, {
    onSuccess: (data, { prescriptionNo }) => {
      invalidPrescriptionCache(queryClient, prescriptionNo);
    },
    onError: ({ message }) => {
      toast({ message, status: "error" });
    },
  });
}

export type RecreatePrescriptionVariables = {
  prescriptionNo: string;
};

export async function recreatePrescription(
  variables: RecreatePrescriptionVariables
) {
  const fetch = createBrowserFetch();
  return await fetch.put<RecreatePrescriptionResponse>(
    `${ENV.API_V2}/tcore/prescription-requests/${variables.prescriptionNo}/resubmit`
  );
}

type RecreatePrescriptionReturn = AwaitedReturn<typeof recreatePrescription>;

export function useRecreatePrescription() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    RecreatePrescriptionReturn,
    FetchError,
    RecreatePrescriptionVariables
  >(recreatePrescription, {
    onSuccess: (data, { prescriptionNo }) => {
      invalidPrescriptionCache(queryClient, prescriptionNo);
    },
    onError: ({ message }) => {
      toast({ message, status: "error" });
    },
  });
}

export type SubmitPrescriptionVariables = {
  consultationId?: number;
  userAddressId: number;
  notes?: string;
  images: {
    id: number;
    base64: string;
  }[];
};

export async function submitPrescription(
  variables: SubmitPrescriptionVariables
) {
  const fetch = createBrowserFetch();
  const response = await fetch.post<PrescriptionSubmitResponse>(
    `${ENV.API}/tcore/prescription-requests`,
    {
      ...variables,
    }
  );
  return {
    message: response.meta.message,
    data: modelSubmitPrescription(response.data),
  };
}

type SubmitPrescriptionReturn = AwaitedReturn<typeof submitPrescription>;

export function useSubmitPrescription() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { navigate } = useNavigation();
  return useMutation<
    SubmitPrescriptionReturn,
    FetchError,
    SubmitPrescriptionVariables
  >(submitPrescription, {
    onError: ({ message }) => {
      toast({
        message,
        status: "error",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(prescriptionKeys.all);
      navigate("PRESCRIPTION_FORM_THANK_YOU", {
        prescriptionNo: data.data.prescriptionNumber,
      });
    },
  });
}
