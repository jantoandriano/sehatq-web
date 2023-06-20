import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, cleanQuery, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelTelemedicineLandingCampaign,
  TelemedicineLandingCampaignResponse,
} from "./telemedicine-landing-campaign-model";

type TelemedLandingCampaignQuery = {
  placementCode: string;
};

export const telemedLandingCampaignKeys = {
  all: ["TELEMED_LANDING_CAMPAIGN"],
  details: () => [...telemedLandingCampaignKeys.all, "DETAIL"],
  detail: (query: TelemedLandingCampaignQuery) => [
    ...telemedLandingCampaignKeys.details(),
    cleanQuery(query),
  ],
};

export async function getTelemedLandingCampaign({
  fetch,
  query,
}: FetcherArgs<TelemedLandingCampaignQuery>) {
  const result = await fetch.get<TelemedicineLandingCampaignResponse>(
    `${ENV.API}/telemed-service/doctors/campaign-placements/${query.placementCode}`
  );
  return {
    data: modelTelemedicineLandingCampaign(result),
  };
}

export type TelemedLandingCampaignCache = Awaited<
  ReturnType<typeof getTelemedLandingCampaign>
>;

export function useGetTelemedLandingCampaign<
  TData = TelemedLandingCampaignCache
>(
  query: TelemedLandingCampaignQuery,
  options?: UseQueryOptions<TelemedLandingCampaignCache, FetchError, TData>
) {
  return useQuery<TelemedLandingCampaignCache, FetchError, TData>(
    telemedLandingCampaignKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedLandingCampaign({ fetch, query });
    },
    options
  );
}
