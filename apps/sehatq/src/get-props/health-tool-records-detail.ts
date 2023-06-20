import { dehydrate, QueryClient } from "react-query";
import { healthToolKeys, getHealthToolRecordsDetail } from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export async function getHealthToolsRecordDetailProps(arg: {
  isMobile: boolean;
  healthToolsIdOrSlug: string;
  id: string;
  cookie: string;
}) {
  const { isMobile, healthToolsIdOrSlug, id, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();

  const query = { healthToolsIdOrSlug, id };

  await queryClient.prefetchQuery(
    healthToolKeys.recordDetail(query),
    async () =>
      await getHealthToolRecordsDetail({
        fetch,
        query,
      })
  );

  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile };
}
