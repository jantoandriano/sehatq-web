import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  FetchError,
  AwaitedReturn,
  cleanQuery,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelRelatedForums,
  RelatedForumsResponse,
} from "./related-forums-models";

type RelatedForumsQuery = {
  tagId: string;
};

export const relatedForumsKeys = {
  all: ["RELATED_FORUMS"],
  lists: () => [...relatedForumsKeys.all, "LISTS"],
  list: (query: RelatedForumsQuery) => [
    ...relatedForumsKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getRelatedForums({
  fetch,
  query,
}: FetcherArgs<RelatedForumsQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<RelatedForumsResponse>(
    `${ENV.API}/content/related/forums${queryString}`
  );
  return modelRelatedForums(result.data);
}

export type RelatedForumsCache = AwaitedReturn<typeof getRelatedForums>;

export function useGetRelatedForums<TData = RelatedForumsCache>(
  query: RelatedForumsQuery,
  options?: UseQueryOptions<RelatedForumsCache, FetchError, TData>
) {
  return useQuery<RelatedForumsCache, FetchError, TData>(
    relatedForumsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getRelatedForums({ fetch, query });
    },
    options
  );
}
