import { dehydrate, QueryClient } from "react-query";
import {
  myMentalRecordsKeys,
  getMyMentalRecords,
  familyMembersKeys,
  getFamilyMembers,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type MyMentalRecordsParams = {
  userId: string;
  cookie: string;
};

export type MyMentalRecordsQuery = {
  dateRange?: string;
  page?: string;
};

export async function getMyMentalRecordsProps(
  arg: MyMentalRecordsQuery & MyMentalRecordsParams & { isMobile: boolean }
) {
  const { isMobile, userId, dateRange = "", page = "", cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();

  let error = null;

  try {
    const MyMentalRecordsQuery = {
      userId,
      perPage: "5",
      page,
      dateRange,
    };

    const FamilyMemberQuery = {
      includeMe: "1",
    };

    if (MyMentalRecordsQuery.userId) {
      await Promise.all([
        queryClient.prefetchQuery(
          familyMembersKeys.list(FamilyMemberQuery),
          async () =>
            await getFamilyMembers({
              fetch,
              query: FamilyMemberQuery,
            })
        ),
        queryClient.prefetchQuery(
          myMentalRecordsKeys.list(MyMentalRecordsQuery),
          async () =>
            await getMyMentalRecords({
              fetch,
              query: MyMentalRecordsQuery,
            })
        ),
      ]);
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
