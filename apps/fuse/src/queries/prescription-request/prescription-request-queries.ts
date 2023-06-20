import { useMutation } from "react-query";
import { ENV } from "@sehatq/constants";
import { createBrowserFetch, FetchError, AwaitedReturn } from "@sehatq/utils";
import { OptionalFetcherArgs } from "@sehatq/components/src/types";
import { useToast } from "@sehatq/components";

export type PrescriptionRequestsVariables = {
  data: {
    consultationId: number | string;
    userAddressId: number | string;
    notes: string;
  };
};

export type PrescriptionRequestsResponse = {
  meta: {
    message: string;
  };
  data: {
    id: number | string;
    prNumber: number | string;
  };
};

export async function createPrescriptionRequests({
  fetch,
  data,
}: OptionalFetcherArgs & PrescriptionRequestsVariables) {
  const url = `${ENV.API}/tcore/prescription-requests`;
  return await fetch.post<PrescriptionRequestsResponse>(url, data);
}

type CreatePrescriptionRequestsReturn = AwaitedReturn<
  typeof createPrescriptionRequests
>;

export function useCreatePrescriptionRequests() {
  const toast = useToast();
  return useMutation<
    CreatePrescriptionRequestsReturn,
    FetchError,
    PrescriptionRequestsVariables["data"]
  >(
    async (data) => {
      const fetch = createBrowserFetch();
      return createPrescriptionRequests({ fetch, data });
    },
    {
      onError: ({ message }) => toast({ message, status: "error" }),
      onSuccess: () => toast({ message: "Success", status: "success" }),
    }
  );
}
