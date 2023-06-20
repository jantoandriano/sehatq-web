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
  DiseasesResponse,
  modelDiseases,
  modelMetaDiseases,
  DiseasesSEOResponse,
  modelDiseasesSEO,
  modelDiseaseDetailSEO,
  DiseaseDetailSEOResponse,
} from "./diseases-model";

type DiseasesQuery = {
  page: string;
  perPage: string;
  categoryId: string;
};

type DiseaseSEOQuery = {
  slug: string;
};

type DiseaseDetailSEOQuery = {
  slug: string;
};

export const diseaseKeys = {
  all: ["DISEASE"],
  lists: () => [...diseaseKeys.all, "LISTS"],
  list: (query: DiseasesQuery) => [...diseaseKeys.lists(), cleanQuery(query)],
  seos: () => [...diseaseKeys.all, "SEO"],
  seo: (query: DiseaseSEOQuery) => [...diseaseKeys.seos(), cleanQuery(query)],
};

export async function getDiseases({
  fetch,
  query,
}: FetcherArgs<DiseasesQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<DiseasesResponse>(
    `${ENV.API}/content/diseases${queryString}`
  );

  return {
    data: modelDiseases(result.data),
    meta: modelMetaDiseases(result.meta),
  };
}

export async function getDiseaseSEO({
  fetch,
  query,
}: FetcherArgs<DiseaseSEOQuery>) {
  const result = await fetch.get<DiseasesSEOResponse>(
    `${ENV.API}/content/disease-groups/${query.slug}`
  );
  return modelDiseasesSEO(result);
}

export async function getDiseaseDetailSEO({
  fetch,
  query,
}: FetcherArgs<DiseaseDetailSEOQuery>) {
  const result = await fetch.get<DiseaseDetailSEOResponse>(
    `${ENV.API}/content-service/sehatq/seo-contents/domain/disease/slug/${query.slug}`
  );
  return modelDiseaseDetailSEO(result.data);
}

export type DiseasesCache = Awaited<ReturnType<typeof getDiseases>>;

export function useGetDiseases<TData = DiseasesCache>(
  query: DiseasesQuery,
  options?: UseQueryOptions<DiseasesCache, FetchError, TData>
) {
  return useQuery<DiseasesCache, FetchError, TData>(
    diseaseKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getDiseases({ fetch, query });
    },
    options
  );
}

export type DiseaseSEOCache = Awaited<ReturnType<typeof getDiseaseSEO>>;
export function useGetDiseaseSEO<TData = DiseaseSEOCache>(
  query: DiseaseSEOQuery,
  options?: UseQueryOptions<DiseaseSEOCache, FetchError, TData>
) {
  return useQuery<DiseaseSEOCache, FetchError, TData>(
    diseaseKeys.seo(query),
    async () => {
      const fetch = createBrowserFetch();
      return getDiseaseSEO({ fetch, query });
    },
    options
  );
}

export type DiseaseDetailSEOCache = Awaited<
  ReturnType<typeof getDiseaseDetailSEO>
>;
export function useGetDiseaseDetailSEO<TData = DiseaseDetailSEOCache>(
  query: DiseaseSEOQuery,
  options?: UseQueryOptions<DiseaseDetailSEOCache, FetchError, TData>
) {
  return useQuery<DiseaseDetailSEOCache, FetchError, TData>(
    diseaseKeys.seo(query),
    async () => {
      const fetch = createBrowserFetch();
      return getDiseaseDetailSEO({ fetch, query });
    },
    options
  );
}
