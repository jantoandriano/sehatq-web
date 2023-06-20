import { dehydrate, QueryClient } from "react-query";
import {
  getHealthToolScoreList,
  healthToolKeys,
  familyMembersKeys,
  getFamilyMembers,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export async function getHealthToolScoreListProps(arg: {
  isMobile: boolean;
  userId: string;
  healthToolSlug: string;
  cookie?: string;
}) {
  const { isMobile, userId, healthToolSlug, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();

  const healthToolScoreListQuery = {
    page: "1",
    perPage: "10",
    userId,
    healthToolSlug: healthToolSlug,
    dateRange: "",
  };
  const FamilyMemberQuery = {
    includeMe: "1",
  };
  await Promise.all([
    queryClient.prefetchQuery(
      familyMembersKeys.list(FamilyMemberQuery),
      async () =>
        await getFamilyMembers({
          fetch,
          query: FamilyMemberQuery,
        })
    ),
    queryClient.prefetchInfiniteQuery(
      healthToolKeys.scoreList(healthToolScoreListQuery),
      async () => {
        return await getHealthToolScoreList({
          fetch,
          query: healthToolScoreListQuery,
        });
      }
    ),
  ]);
  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    healthToolScoreListQuery,
  };
}
