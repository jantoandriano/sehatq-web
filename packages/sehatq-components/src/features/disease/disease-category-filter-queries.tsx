import { useQuery, UseQueryOptions } from "react-query";
import { FetchError, cleanQuery } from "@sehatq/utils";

import { modelDiseaseCategories } from "./disease-category-filter-model";

type DiseaseCategoriesQuery = {
  slug: string;
};

export const diseaseCategoryKeys = {
  all: ["DISEASE_CATEGORY"],
  lists: () => [...diseaseCategoryKeys.all, "LISTS"],
  list: (query: DiseaseCategoriesQuery) => [
    ...diseaseCategoryKeys.lists(),
    cleanQuery(query),
  ],
};

export function getDiseaseCategories({ slug }: DiseaseCategoriesQuery) {
  return {
    data: modelDiseaseCategories(slug),
  };
}

export type DiseaseCategoriesCache = Awaited<
  ReturnType<typeof getDiseaseCategories>
>;

export function useGetDiseaseCategories<TData = DiseaseCategoriesCache>(
  query: DiseaseCategoriesQuery,
  options?: UseQueryOptions<DiseaseCategoriesCache, FetchError, TData>
) {
  return useQuery<DiseaseCategoriesCache, FetchError, TData>(
    diseaseCategoryKeys.list(query),
    async () => {
      return getDiseaseCategories(query);
    },
    options
  );
}
