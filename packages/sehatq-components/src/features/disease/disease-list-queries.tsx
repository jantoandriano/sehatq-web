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
  modelDiseaseList,
  DiseaseListResponse,
  DiseaseDetailResponse,
  modelDiseaseDetail,
} from "./disease-list-model";

type DiseaseListQuery = {
  categoryId: string;
  firstChar: string;
  tagSlug: string;
  random: string;
  perPage: string;
  page: string;
};

type DiseasesDetailQuery = {
  diseaseSlug: string;
};

export const diseaseListKeys = {
  all: ["DISEASE_LIST"],
  lists: () => [...diseaseListKeys.all, "LISTS"],
  list: (query: DiseaseListQuery) => [
    ...diseaseListKeys.lists(),
    cleanQuery(query),
  ],
  details: () => [...diseaseListKeys.all, "DETAIL"],
  detail: (query: DiseasesDetailQuery) => [
    ...diseaseListKeys.details(),
    cleanQuery(query),
  ],
};

export async function getDiseaseList({
  fetch,
  query,
}: FetcherArgs<DiseaseListQuery>) {
  const result = await fetch.get<DiseaseListResponse>(
    `${ENV.API}/content/diseases/${queryToString(query)}`
  );
  return {
    data: modelDiseaseList(result),
  };
}

export type DiseaseListCache = Awaited<ReturnType<typeof getDiseaseList>>;

export function useGetDiseaseList<TData = DiseaseListCache>(
  query: DiseaseListQuery,
  options?: UseQueryOptions<DiseaseListCache, FetchError, TData>
) {
  return useQuery<DiseaseListCache, FetchError, TData>(
    diseaseListKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getDiseaseList({ fetch, query });
    },
    options
  );
}

export async function getDiseaseDetail({
  fetch,
  query,
}: FetcherArgs<DiseasesDetailQuery>) {
  const result = await fetch.get<DiseaseDetailResponse>(
    `${ENV.API}/content/diseases/${query.diseaseSlug}`
  );
  return {
    data: modelDiseaseDetail(result),
  };
}

export type DiseaseDetailCache = Awaited<ReturnType<typeof getDiseaseDetail>>;
export function useGetDiseaseDetail<TData = DiseaseDetailCache>(
  query: DiseasesDetailQuery,
  options?: UseQueryOptions<DiseaseDetailCache, FetchError, TData>
) {
  return useQuery<DiseaseDetailCache, FetchError, TData>(
    diseaseListKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getDiseaseDetail({ fetch, query });
    },
    options
  );
}
