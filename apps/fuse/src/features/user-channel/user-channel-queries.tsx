import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError, cleanQuery } from "@sehatq/utils";
import { FetcherArgs } from "@sehatq/components";
import { ENV } from "@sehatq/constants";

export type UserChannelQuery = {
  uuid: string;
  token: string;
};

export interface UserChannelResponse {
  data: {
    id: number;
    uuid: string;
    channel: string;
    name: string;
    email: string;
    birthDate: string;
    gender: string;
    photoUrl: string;
    idType: string;
    idNumber: string;
    idTypeImageUrl: string;
    phoneNumber: string;
    height: string;
    weight: string;
  };
}

export const userChannelKeys = {
  all: ["USER_CHANNEL"],
  details: () => [...userChannelKeys.all, "DETAIL"],
  detail: (query: UserChannelQuery) => [
    ...userChannelKeys.details(),
    cleanQuery(query),
  ],
};

export async function getUserChannel({
  fetch,
  query,
}: FetcherArgs<UserChannelQuery>) {
  const result = await fetch.get<UserChannelResponse>(
    `${ENV.API}/user-service/user-channel/${query.uuid}`,
    { headers: { Authorization: `Basic ${ENV.USER_SERVICE_TOKEN}` } }
  );
  return {
    data: result.data,
  };
}

export type UserChannelCache = Awaited<ReturnType<typeof getUserChannel>>;

export function useGetUserChannel<TData = UserChannelCache>(
  query: UserChannelQuery,
  options?: UseQueryOptions<UserChannelCache, FetchError, TData>
) {
  return useQuery<UserChannelCache, FetchError, TData>(
    userChannelKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getUserChannel({ fetch, query });
    },
    options
  );
}
