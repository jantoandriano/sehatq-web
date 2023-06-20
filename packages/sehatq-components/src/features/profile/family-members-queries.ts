import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient,
} from "react-query";
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
import { ToastArgs } from "../../user-interfaces/use-toast";
import {
  modelFamilyMembers,
  FamilyMembersResponse,
  FamilyFormResponse,
} from "./family-members-model";

export type FamilyMembersQuery = {
  includeMe: string;
};

export type SubmitFamilyFormVariables = {
  name: string;
  relationId: number;
  gender: string;
  birthDate: string;
  height: number;
  weight: number;
  phone: string;
  photo: string;
  idType: string;
  idNumber: string;
  idImageBase64: string;
  address: string;
};

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

export const familyMembersKeys = {
  all: ["FAMILY_MEMBERS"],
  lists: () => [...familyMembersKeys.all, "LISTS"],
  list: (query: FamilyMembersQuery) => [
    ...familyMembersKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getFamilyMembers({
  fetch,
  query,
}: FetcherArgs<FamilyMembersQuery>) {
  const { ...otherQuery } = query;
  const queryString = queryToString({
    ...otherQuery,
  });
  const result = await fetch.get<FamilyMembersResponse>(
    `${ENV.API}/account/family-members${queryString}`
  );
  return modelFamilyMembers(result.data);
}

export async function submitFamilyForm(variables: SubmitFamilyFormVariables) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<FamilyFormResponse>(
    `${ENV.API}/account/family-members`,
    variables
  );
  return {
    message: response.meta.message,
    data: response.data,
  };
}

export type FamilyMembersCache = AwaitedReturn<typeof getFamilyMembers>;

export function useGetFamilyMembers<TData = FamilyMembersCache>(
  query: FamilyMembersQuery,
  options?: UseQueryOptions<FamilyMembersCache, FetchError, TData>
) {
  return useQuery<FamilyMembersCache, FetchError, TData>(
    familyMembersKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getFamilyMembers({ fetch, query });
    },
    options
  );
}

type SubmitFamilyFormReturn = AwaitedReturn<typeof submitFamilyForm>;
export function useSubmitFamilyForm() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    SubmitFamilyFormReturn,
    FetchError,
    SubmitFamilyFormVariables
  >(submitFamilyForm, {
    onError: ({ message }) => handleToastMessage(toast, message, "error"),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(familyMembersKeys.list({ includeMe: "1" }));
      handleToastMessage(toast, message, "success");
    },
  });
}
