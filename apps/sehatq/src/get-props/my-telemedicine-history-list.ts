import { dehydrate, QueryClient } from "react-query";
import {
  familyMembersKeys,
  getMyTelemedicines,
  myTelemedicineKeys,
  getFamilyMembers,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type MyTelemedicineHistoryListParams = {
  cookie: string | undefined;
};

export type MyTelemedicineHistoryListQuery = {
  userId: string;
  page: string;
  perPage: string;
};

export async function getMyTelemedicineHistoryListProps(
  arg: MyTelemedicineHistoryListParams & {
    isMobile: boolean;
  } & MyTelemedicineHistoryListQuery
) {
  const { isMobile, cookie, userId, page, perPage } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();

  const userSelected = userId ?? "";
  const myTelemedicineHistoryListQuery = {
    page: page ?? "1",
    perPage: perPage ?? "10",
    userId: userSelected == "all" ? "" : userSelected,
  };

  await Promise.all([
    queryClient.prefetchQuery(
      familyMembersKeys.list({ includeMe: "1" }),
      async () =>
        await getFamilyMembers({
          fetch,
          query: { includeMe: "1" },
        })
    ),
    queryClient.prefetchInfiniteQuery(
      myTelemedicineKeys.infiniteList(myTelemedicineHistoryListQuery),
      async () =>
        await getMyTelemedicines({
          fetch,
          query: myTelemedicineHistoryListQuery,
        })
    ),
  ]);

  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile };
}
