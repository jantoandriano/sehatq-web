import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, formatDate, nullify } from "@sehatq/utils";
import {
  hcpKeys,
  HCPDetailQuery,
  getHCPDetail,
  hcpSchedulesKeys,
  getHCPSchedules,
  HCPSchedulesQuery,
} from "@sehatq/components";

export type HCPDetailPageParams = {
  hcpSlug: string;
};

export async function getHCPDetailProps(
  arg: HCPDetailPageParams & { isMobile: boolean }
) {
  const { isMobile, hcpSlug } = arg;

  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;

  try {
    const hcpQuery: HCPDetailQuery = {
      hcpSlug,
      userLat: "",
      userLong: "",
    };

    const hcpData = await queryClient.fetchQuery(
      hcpKeys.detail(hcpQuery),
      async () =>
        await getHCPDetail({
          fetch,
          query: hcpQuery,
        })
    );

    // prefecth hcp schedules
    const availToCollaps = hcpData?.data.hcpHcfSchedules?.find(
      (f) => f.bookingOnline > 0
    );
    if (hcpData && availToCollaps) {
      const hcpScheduleQuery: HCPSchedulesQuery = {
        date: formatDate(new Date(), "yyyy-MM-dd"),
        hcpId: `${hcpData.data.id}`,
        hcfId: `${availToCollaps.id}`,
        range: `6`,
      };
      await queryClient.prefetchQuery(
        hcpSchedulesKeys.list(hcpScheduleQuery),
        async () =>
          await getHCPSchedules({
            fetch,
            query: hcpScheduleQuery,
          })
      );
    }
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    error,
  };
}
