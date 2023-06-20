import { dehydrate, QueryClient } from "react-query";
import { getMyTelemedicines, myTelemedicineKeys } from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type MyTelemedicinesParams = {
  userId: string;
  cookie: string;
};

export async function getMyTelemedicinesProps(
  arg: MyTelemedicinesParams & { isMobile: boolean }
) {
  const { userId = "", isMobile, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();
  const myTelemedicinesQuery = {
    userId,
    perPage: isMobile ? "10" : "5",
    page: "1",
  };
  await queryClient.prefetchInfiniteQuery(
    myTelemedicineKeys.infiniteList(myTelemedicinesQuery),
    async () =>
      await getMyTelemedicines({
        fetch,
        query: myTelemedicinesQuery,
      })
  );
  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile };
}
