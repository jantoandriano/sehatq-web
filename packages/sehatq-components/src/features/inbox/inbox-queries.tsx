import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError, AwaitedReturn } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import { InboxCounterResponse } from "./inbox-model";

export const inboxKeys = {
  all: ["INBOX_COUNTER"],
};

export async function getInboxCounter({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<InboxCounterResponse>(
    `${ENV.API}/inbox-service/sehatq/inboxes/counter-unread`
  );
  return result.data.count;
}

export type InboxCounterCache = AwaitedReturn<typeof getInboxCounter>;

export function useGetInboxCounter<TData = InboxCounterCache>(
  options?: UseQueryOptions<InboxCounterCache, FetchError, TData>
) {
  return useQuery<InboxCounterCache, FetchError, TData>(
    inboxKeys.all,
    async () => {
      const fetch = createBrowserFetch();
      return getInboxCounter({ fetch });
    },
    options
  );
}
