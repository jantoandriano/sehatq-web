import { useQuery, UseQueryOptions } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import { modelTagSEO, TagSEOResponse } from "./tag-seo-model";

type TagSEOQuery = {
  tagSlug: string;
};

export const tagSEOKeys = {
  all: ["TAG"],
  seos: () => [...tagSEOKeys.all, "SEO"],
  seo: (query: TagSEOQuery) => [...tagSEOKeys.seos(), cleanQuery(query)],
};

export async function getTagSEO({ fetch, query }: FetcherArgs<TagSEOQuery>) {
  const result = await fetch.get<TagSEOResponse>(
    `${ENV.API}/content-service/sehatq/seo-contents/domain/tag/slug/${query.tagSlug}`
  );
  return modelTagSEO(result.data);
}

export type TagSEOCache = AwaitedReturn<typeof getTagSEO>;

export function useGetTagSEO<TData = TagSEOCache>(
  query: TagSEOQuery,
  options?: UseQueryOptions<TagSEOCache, FetchError, TData>
) {
  return useQuery<TagSEOCache, FetchError, TData>(
    tagSEOKeys.seo(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTagSEO({ fetch, query });
    },
    options
  );
}
