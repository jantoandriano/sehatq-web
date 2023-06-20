import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, cleanQuery, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelTelemedicineCampaign,
  TelemedicineCampaignResponse,
} from "./telemedicine-campaign-model";

type TelemedCampaignQuery = {
  campaignSlug: string;
};

export const telemedCampaignKeys = {
  all: ["TELEMED_CAMPAIGN"],
  details: () => [...telemedCampaignKeys.all, "DETAIL"],
  detail: (query: TelemedCampaignQuery) => [
    ...telemedCampaignKeys.details(),
    cleanQuery(query),
  ],
};

export async function getTelemedCampaign({
  fetch,
  query,
}: FetcherArgs<TelemedCampaignQuery>) {
  const result = await fetch.get<TelemedicineCampaignResponse>(
    `${ENV.API}/telemed-service/doctors/campaigns/${query.campaignSlug}`
  );
  return {
    data: modelTelemedicineCampaign(result.data),
  };
}

export type TelemedicineCampaignCache = Awaited<
  ReturnType<typeof getTelemedCampaign>
>;

export function useGetTelemedCampaign<TData = TelemedicineCampaignCache>(
  query: TelemedCampaignQuery,
  options?: UseQueryOptions<TelemedicineCampaignCache, FetchError, TData>
) {
  return useQuery<TelemedicineCampaignCache, FetchError, TData>(
    telemedCampaignKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedCampaign({ fetch, query });
    },
    options
  );
}
