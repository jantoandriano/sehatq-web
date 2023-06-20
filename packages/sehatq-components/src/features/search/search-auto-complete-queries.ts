import { useQuery, UseQueryOptions } from "react-query";
import {
  cleanQuery,
  createBrowserFetch,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelSearchAutoComplete,
  SearchAutoCompleteResponse,
} from "./search-auto-complete-model";

type SearchAutoCompleteQuery = {
  query: string;
  userId: string;
};

export const SearchAutoCompleteKeys = {
  all: ["SEARCH_AUTOCOMPLETE"],
  lists: () => [...SearchAutoCompleteKeys.all, "LISTS"],
  list: (query: SearchAutoCompleteQuery) => [
    ...SearchAutoCompleteKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getSearchAutoComplete({
  fetch,
  query,
}: FetcherArgs<SearchAutoCompleteQuery>) {
  const result = await fetch.get<SearchAutoCompleteResponse>(
    `${ENV.API}/search-service/search/autocomplete${queryToString(query)}`
  );
  return modelSearchAutoComplete(result.data);
}

export type SearchAutoCompleteCache = Awaited<
  ReturnType<typeof getSearchAutoComplete>
>;

export function useGetSearchAutoComplete<TData = SearchAutoCompleteCache>(
  query: SearchAutoCompleteQuery,
  options?: UseQueryOptions<SearchAutoCompleteCache, FetchError, TData>
) {
  return useQuery<SearchAutoCompleteCache, FetchError, TData>(
    SearchAutoCompleteKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getSearchAutoComplete({ fetch, query });
    },
    options
  );
}
