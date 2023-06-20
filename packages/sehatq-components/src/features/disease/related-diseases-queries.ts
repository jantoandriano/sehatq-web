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
  modelRelatedDiseases,
  RelatedDiseasesResponse,
} from "./related-diseases-models";

type RelatedDiseasesQuery = {
  tagId: string;
};

export const relatedDiseasesKeys = {
  all: ["RELATED_DISEASES"],
  lists: () => [...relatedDiseasesKeys.all, "LISTS"],
  list: (query: RelatedDiseasesQuery) => [
    ...relatedDiseasesKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getRelatedDiseases({
  fetch,
  query,
}: FetcherArgs<RelatedDiseasesQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<RelatedDiseasesResponse>(
    `${ENV.API}/content/related/diseases${queryString}`
  );
  return modelRelatedDiseases(result.data);
}

export type RelatedDiseasesCache = AwaitedReturn<typeof getRelatedDiseases>;

export function useGetRelatedDiseases<TData = RelatedDiseasesCache>(
  query: RelatedDiseasesQuery,
  options?: UseQueryOptions<RelatedDiseasesCache, FetchError, TData>
) {
  return useQuery<RelatedDiseasesCache, FetchError, TData>(
    relatedDiseasesKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getRelatedDiseases({ fetch, query });
    },
    options
  );
}
