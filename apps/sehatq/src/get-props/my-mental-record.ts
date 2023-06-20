import { getMyMentalRecord, myMentalRecordsKeys } from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";
import { dehydrate, QueryClient } from "react-query";

export type MyMentalRecordParams = {
  mentalId: string;
  cookie: string;
};

export async function getMyMentalRecordProps(
  arg: MyMentalRecordParams & { isMobile: boolean }
) {
  const { isMobile, mentalId, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();
  const myMentalRecordQuery = {
    mentalId,
  };

  await queryClient.prefetchQuery(
    myMentalRecordsKeys.detail(myMentalRecordQuery),
    async () =>
      await getMyMentalRecord({
        fetch,
        query: myMentalRecordQuery,
      })
  );
  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile };
}
