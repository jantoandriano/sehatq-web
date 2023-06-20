import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelDCPSuggestion,
  DCPSuggestionResponse,
} from "./dcp-suggestion-model";
export type DCPSuggestionQuery = {
  search: string;
};

export const dcpSuggestionKeys = {
  all: ["DCP_SUGGESTION"],
  lists: () => [...dcpSuggestionKeys.all, "LISTS"],
  list: (query: DCPSuggestionQuery) => [
    ...dcpSuggestionKeys.lists(),
    cleanQuery(query),
  ],
};
export async function getDCPSuggestion({
  fetch,
  query,
}: FetcherArgs<DCPSuggestionQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<DCPSuggestionResponse>(
    `${ENV.API}/tcore/dcp/suggestion${queryString}`
  );
  return {
    data: modelDCPSuggestion(result.data),
  };
}
export type DCPSuggestionCache = Awaited<ReturnType<typeof getDCPSuggestion>>;
export function useGetDCPSuggestion<TData = DCPSuggestionCache>(
  query: DCPSuggestionQuery,
  options?: UseQueryOptions<DCPSuggestionCache, FetchError, TData>
) {
  return useQuery<DCPSuggestionCache, FetchError, TData>(
    dcpSuggestionKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getDCPSuggestion({ fetch, query });
    },
    options
  );
}
