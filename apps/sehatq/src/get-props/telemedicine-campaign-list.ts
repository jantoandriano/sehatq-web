import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import {
  telemedLandingCampaignKeys,
  getTelemedLandingCampaign,
} from "@sehatq/components";

export type TelemedCampaignListParams = {
  cookie: string | undefined;
};

export async function getTelemedicineCampaignListProps(
  arg: { isMobile: boolean } & TelemedCampaignListParams
) {
  const { isMobile, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();
  let error = null;

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        telemedLandingCampaignKeys.detail({ placementCode: "landing-1" }),
        async () =>
          await getTelemedLandingCampaign({
            fetch,
            query: { placementCode: "landing-1" },
          })
      ),
      queryClient.prefetchQuery(
        telemedLandingCampaignKeys.detail({ placementCode: "landing-2" }),
        async () =>
          await getTelemedLandingCampaign({
            fetch,
            query: { placementCode: "landing-2" },
          })
      ),
    ]);
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    error,
  };
}
