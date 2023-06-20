import { useMutation } from "react-query";
import { createBrowserFetch, FetchError, queryToString } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";

export interface GenerateOTPVariables {
  email: string;
}

export interface ValidateOTPVariables extends GenerateOTPVariables {
  otpCode: string;
}

export type OTPEmailQuery = {
  excludeEmailVerified: "true" | "false";
};

export type GenerateOTPResponse = {
  otp: {
    lastSendOtp: string;
    remainingRetryOtp: number;
    resendOtpWaitingTime: string;
  };
  verified: boolean;
};

export type GenerateOTPMeta = {
  message: string;
};

export type ValidateOTPResponse = {
  meta: {
    message: string;
  };
  data: null[];
};

export async function generateOTPEmail(
  variables: GenerateOTPVariables,
  query: OTPEmailQuery
) {
  const omitToken: boolean = query.excludeEmailVerified === "true";
  const fetch = createBrowserFetch(omitToken);
  const result = await fetch.post(
    `${ENV.API}/email-otp/generate${queryToString(query)}`,
    { ...variables }
  );
  return {
    data: result.data as GenerateOTPResponse,
    meta: result.meta as GenerateOTPMeta,
  };
}

export async function validateOTPEmail(
  variables: ValidateOTPVariables,
  query: OTPEmailQuery
) {
  const omitToken: boolean = query.excludeEmailVerified === "true";
  const fetch = createBrowserFetch(omitToken);
  const result = await fetch.post(
    `${ENV.API}/email-otp/validate${queryToString(query)}`,
    { ...variables }
  );
  return {
    data: result.data as ValidateOTPResponse,
  };
}

export type GenerateOTPEmailCache = Awaited<
  ReturnType<typeof generateOTPEmail>
>;

export function useGenerateOTPEmail(query: OTPEmailQuery) {
  return useMutation<GenerateOTPEmailCache, FetchError, GenerateOTPVariables>(
    (variables) => generateOTPEmail(variables, query)
  );
}

export type ValidateOTPEmailCache = Awaited<
  ReturnType<typeof validateOTPEmail>
>;

export function useValidateOTPEmail(query: OTPEmailQuery) {
  return useMutation<ValidateOTPEmailCache, FetchError, ValidateOTPVariables>(
    (variables) => validateOTPEmail(variables, query)
  );
}
