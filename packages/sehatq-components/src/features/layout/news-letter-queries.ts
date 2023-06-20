import { useMutation } from "react-query";
import { createBrowserFetch, FetchError, AwaitedReturn } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { useToast } from "../../user-interfaces";
import { SubmitNewsLetterResponse } from "./news-letter-model";

export type SubmitNewsLetterVariables = {
  email: string;
  gender: string;
};

export async function submitNewsLetter(variables: SubmitNewsLetterVariables) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<SubmitNewsLetterResponse>(
    `${ENV.API}/newsletters`,
    { email: variables.email, gender: variables.gender }
  );
  return {
    message: response.meta.message,
  };
}

type SubmitNewsLetterReturn = AwaitedReturn<typeof submitNewsLetter>;

export function useSubmitNewsLetter() {
  const toast = useToast();
  return useMutation<
    SubmitNewsLetterReturn,
    FetchError,
    SubmitNewsLetterVariables
  >(submitNewsLetter, {
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
