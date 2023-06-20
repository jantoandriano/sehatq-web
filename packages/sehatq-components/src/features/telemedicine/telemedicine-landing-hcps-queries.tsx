import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import {
  modelTelemedLandingHCPS,
  TelemedLandingHCPSResponse,
} from "./telemedicine-landing-hcps-model";

export const telemedLandingHCPSKeys = {
  all: ["TELEMED_LANDING_HCPS"],
  lists: () => [...telemedLandingHCPSKeys.all, "LISTS"],
  list: () => [...telemedLandingHCPSKeys.lists()],
};

export async function getTelemedLandingHCPS({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<TelemedLandingHCPSResponse>(
    `${ENV.API}/telemed-service/doctors/landing`
  );
  return { data: modelTelemedLandingHCPS(result.data) };
}

export type TelemedLandingHCPSCache = Awaited<
  ReturnType<typeof getTelemedLandingHCPS>
>;

export function useGetTelemedLandingHCPS<TData = TelemedLandingHCPSCache>(
  options?: UseQueryOptions<TelemedLandingHCPSCache, FetchError, TData>
) {
  return useQuery<TelemedLandingHCPSCache, FetchError, TData>(
    telemedLandingHCPSKeys.lists(),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedLandingHCPS({ fetch });
    },
    options
  );
}
