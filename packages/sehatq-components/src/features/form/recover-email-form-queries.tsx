import { useMutation } from "react-query";
import { createBrowserFetch, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";

export interface EmailRecoveryVariables {
  token: string;
  password: string;
  rePassword: string;
}

export type EmailRecoveryResponse = {
  token: string;
  uuid: string;
  uid2Tokens: {
    advertisingToken: string;
    userToken: string;
    refreshToken: string;
  };
};

export type EmailRecoveryMeta = {
  message: string;
};

export async function postEmailRecovery(variables: EmailRecoveryVariables) {
  const fetch = createBrowserFetch();
  const result = await fetch.post(`${ENV.API}/email-recovery`, {
    ...variables,
  });
  return {
    data: result.data as EmailRecoveryResponse,
    meta: result.meta as EmailRecoveryMeta,
  };
}

export type EmailRecoveryCache = Awaited<ReturnType<typeof postEmailRecovery>>;

export function usePostEmailRecovery() {
  return useMutation<EmailRecoveryCache, FetchError, EmailRecoveryVariables>(
    postEmailRecovery
  );
}
