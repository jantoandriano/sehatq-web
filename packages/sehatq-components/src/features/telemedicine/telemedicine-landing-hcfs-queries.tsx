import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import {
  modelTelemedLandingHCFS,
  TelemedLandingHCFSResponse,
} from "./telemedicine-landing-hcfs-model";

export const telemedLandingHCFSKeys = {
  all: ["TELEMED_LANDING_HCFS"],
  lists: () => [...telemedLandingHCFSKeys.all, "LISTS"],
  list: () => [...telemedLandingHCFSKeys.lists()],
};

export async function getTelemedLandingHCFS({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<TelemedLandingHCFSResponse>(
    `${ENV.API}/telemed-service/hospitals/landing`
  );
  return { data: modelTelemedLandingHCFS(result.data) };
}

export type TelemedLandingHCFSCache = Awaited<
  ReturnType<typeof getTelemedLandingHCFS>
>;

export function useGetTelemedLandingHCFS<TData = TelemedLandingHCFSCache>(
  options?: UseQueryOptions<TelemedLandingHCFSCache, FetchError, TData>
) {
  return useQuery<TelemedLandingHCFSCache, FetchError, TData>(
    telemedLandingHCFSKeys.lists(),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedLandingHCFS({ fetch });
    },
    options
  );
}
