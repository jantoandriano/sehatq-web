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
  modelPlaceDetail,
  modelPlaceSuggestion,
  PlaceDetailResponse,
  PlaceSuggestionResponse,
} from "./google-map-model";

export type PlaceSuggestionQuery = {
  input: string;
  latitude: string;
  longitude: string;
};

export type PlaceDetailQuery = {
  placeId: string;
};

export const googlePlaceKeys = {
  all: ["GOOGLE_PLACE"],
  lists: () => [...googlePlaceKeys.all, "LISTS"],
  list: (query: PlaceSuggestionQuery) => [
    ...googlePlaceKeys.lists(),
    cleanQuery(query),
  ],
  details: () => [...googlePlaceKeys.all, "DETAIL"],
  detail: (query: PlaceDetailQuery) => [
    ...googlePlaceKeys.details(),
    cleanQuery(query),
  ],
};

export async function getPlaceSuggestion({
  fetch,
  query,
}: FetcherArgs<PlaceSuggestionQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<PlaceSuggestionResponse>(
    `${ENV.API}/tcore/place/autocomplete${queryString}`
  );

  return {
    data: modelPlaceSuggestion(result.data),
  };
}

export type PlaceSuggestionCache = Awaited<
  ReturnType<typeof getPlaceSuggestion>
>;

export function useGetPlaceSuggestion<TData = PlaceSuggestionCache>(
  query: PlaceSuggestionQuery,
  options?: UseQueryOptions<PlaceSuggestionCache, FetchError, TData>
) {
  return useQuery<PlaceSuggestionCache, FetchError, TData>(
    googlePlaceKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPlaceSuggestion({ fetch, query });
    },
    options
  );
}

export async function getPlaceDetail({
  fetch,
  query,
}: FetcherArgs<PlaceDetailQuery>) {
  const result = await fetch.get<PlaceDetailResponse>(
    `${ENV.API}/tcore/places/${query.placeId}`
  );
  return {
    data: modelPlaceDetail(result.data),
  };
}

export type PlaceDetailCache = Awaited<ReturnType<typeof getPlaceDetail>>;

export function useGetPlaceDetail<TData = PlaceDetailCache>(
  query: PlaceDetailQuery,
  options?: UseQueryOptions<PlaceDetailCache, FetchError, TData>
) {
  return useQuery<PlaceDetailCache, FetchError, TData>(
    googlePlaceKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPlaceDetail({ fetch, query });
    },
    options
  );
}
