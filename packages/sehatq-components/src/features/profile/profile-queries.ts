import { useEffect } from "react";
import { useQuery, useMutation, UseQueryOptions } from "react-query";
import {
  logout,
  createBrowserFetch,
  FetchError,
  AwaitedReturn,
  useNavigation,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import {
  modelProfile,
  ProfileResponse,
  RegisterFCMTokenResponse,
} from "./profile-model";

export const profileKeys = {
  all: ["PROFILE"],
};

export async function getProfile({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<ProfileResponse>(`${ENV.API}/account/profile`);
  return modelProfile(result.data);
}

export type ProfileCache = AwaitedReturn<typeof getProfile>;

interface UseGetProfileOptions<Cache, Error, Data>
  extends UseQueryOptions<Cache, Error, Data> {
  redirectToLogin?: boolean;
}

export function useGetProfile<TData = ProfileCache>(
  options?: UseGetProfileOptions<ProfileCache, FetchError, TData>
) {
  const { redirectToLogin = false, ...restOptions } = options ?? {};
  const { navigate } = useNavigation();
  const result = useQuery<ProfileCache, FetchError, TData>(
    profileKeys.all,
    async () => {
      const fetch = createBrowserFetch();
      return getProfile({ fetch });
    },
    {
      ...restOptions,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { error } = result;
  useEffect(() => {
    const { status } = error || {};
    if (redirectToLogin && status === 401) {
      logout();
      navigate("EXTERNAL_LOGIN");
    }
  }, [error, redirectToLogin, navigate]);

  return result;
}

export type RegisterFCMTokenVariables = {
  registrationToken: string;
};

export async function registerFCMToken(variables: RegisterFCMTokenVariables) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<RegisterFCMTokenResponse>(
    `${ENV.API}/account/fcm-tokens`,
    { registrationToken: variables.registrationToken }
  );
  return {
    message: response.meta.message,
  };
}

type RegisterFCMTokenReturn = AwaitedReturn<typeof registerFCMToken>;

export function useRegisterFCMToken() {
  return useMutation<
    RegisterFCMTokenReturn,
    FetchError,
    RegisterFCMTokenVariables
  >(registerFCMToken);
}

type ChangeEmailVariables = {
  email: string;
  password?: string;
  rePassword?: string;
  isCorporate?: boolean;
};

type ChangeEmailResponse = {
  data: {
    token: string;
    uuid: string;
    uid2Tokens: {
      advertisingToken: string;
      userToken: string;
      refreshToken: string;
    };
  };
};

export async function changeProfileEmail(variables: ChangeEmailVariables) {
  const fetch = createBrowserFetch();
  const result = await fetch.post(`${ENV.API}/account/change-email`, {
    ...variables,
  });
  return {
    data: result.data as ChangeEmailResponse["data"],
  };
}

export type ChangeEmailCache = Awaited<ReturnType<typeof changeProfileEmail>>;

export function useChangeEmail() {
  return useMutation<ChangeEmailCache, FetchError, ChangeEmailVariables>(
    changeProfileEmail
  );
}
