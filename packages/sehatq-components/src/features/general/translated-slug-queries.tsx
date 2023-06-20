import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, cleanQuery, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import {
  modelTranslatedSlug,
  SlugTranslatorResponse,
} from "./translated-slug-model";

export type TranslatedSlugQuery = {
  featureName: string;
  slugs: string[];
};

export const translatedSlugKeys = {
  all: ["TRANSLATED_SLUG"],
  details: () => [...translatedSlugKeys.all, "DETAIL"],
  detail: (query: TranslatedSlugQuery) => [
    ...translatedSlugKeys.details(),
    cleanQuery(query),
  ],
};

export async function getTranslatedSlug({
  fetch,
  query,
}: FetcherArgs<TranslatedSlugQuery>) {
  const result = await fetch.get<SlugTranslatorResponse>(
    `${ENV.API}/slug/${query.featureName}/${query.slugs.join("/")}`
  );

  return {
    data: modelTranslatedSlug(result.data.params),
  };
}

export type TranslatedSlugCache = Awaited<ReturnType<typeof getTranslatedSlug>>;

export function useGetTranslatedSlug<TData = TranslatedSlugCache>(
  query: TranslatedSlugQuery,
  options?: UseQueryOptions<TranslatedSlugCache, FetchError, TData>
) {
  return useQuery<TranslatedSlugCache, FetchError, TData>(
    translatedSlugKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTranslatedSlug({ fetch, query });
    },
    options
  );
}
