import { dehydrate, QueryClient } from "react-query";
import {
  familyMembersKeys,
  getMyBookedTelemedicines,
  myBookedTelemedicinesKeys,
  getFamilyMembers,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type MyBookedTelemedicineListParams = {
  cookie: string | undefined;
};

export type MyBookedTelemedicineListQuery = {
  userId: string;
  page: string;
  perPage: string;
};

export async function getMyBookedTelemedicineListProps(
  arg: MyBookedTelemedicineListParams & {
    isMobile: boolean;
  } & MyBookedTelemedicineListQuery
) {
  const { isMobile, cookie, userId, page, perPage } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();

  const userSelected = userId ?? "";
  const myBookedTelemedicineListQuery = {
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
      myBookedTelemedicinesKeys.infiniteList(myBookedTelemedicineListQuery),
      async () =>
        await getMyBookedTelemedicines({
          fetch,
          query: myBookedTelemedicineListQuery,
        })
    ),
  ]);

  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile };
}
