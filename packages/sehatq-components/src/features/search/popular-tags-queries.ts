import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError, AwaitedReturn } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import { modelPopularTags, PopularTagsResponse } from "./popular-tags-model";

export const popularTagKeys = {
  all: ["POPULAR_TAGS"],
  lists: () => [...popularTagKeys.all, "LISTS"],
  list: () => [...popularTagKeys.lists()],
};

export async function getPopularTags({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<PopularTagsResponse>(
    `${ENV.API}/search-service/search/popular`
  );
  return modelPopularTags(result.data);
}

export type PopularTagsCache = AwaitedReturn<typeof getPopularTags>;

export function useGetPopularTags<TData = PopularTagsCache>(
  options?: UseQueryOptions<PopularTagsCache, FetchError, TData>
) {
  return useQuery<PopularTagsCache, FetchError, TData>(
    popularTagKeys.list(),
    async () => {
      const fetch = createBrowserFetch();
      return getPopularTags({ fetch });
    },
    options
  );
}
