import { useMutation } from "react-query";
import { createBrowserFetch, FetchError, AwaitedReturn } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";

import { SubmitViewCounterResponse } from "./article-view-counter-model";

export type SubmitViewCounterVariables = {
  feature: string;
  id: number;
};

export async function SubmitViewCounter(variables: SubmitViewCounterVariables) {
  const fetch = createBrowserFetch();

  return await fetch.post<SubmitViewCounterResponse>(
    `${ENV.API}/content-service/sehatq/view-counter`,
    variables
  );
}

type SubmitViewCounterReturn = AwaitedReturn<typeof SubmitViewCounter>;

export function useSubmitViewCounter() {
  return useMutation<
    SubmitViewCounterReturn,
    FetchError,
    SubmitViewCounterVariables
  >(SubmitViewCounter);
}
