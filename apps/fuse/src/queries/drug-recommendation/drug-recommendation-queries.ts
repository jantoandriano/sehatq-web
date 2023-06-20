import { useQuery, UseQueryOptions } from "react-query";
import { ENV } from "@sehatq/constants";
import { cleanQuery, createBrowserFetch, FetchError } from "@sehatq/utils";
import { FetcherArgs } from "@sehatq/components/src/types";

export type DrugRecommendations = {
  data: {
    isAllCovered: boolean;
    message: string;
    products: {
      id: number;
      name: string;
      digiqareCategory: string;
      isCovered: boolean;
      qty: number;
      howToUse: string;
      dosage: string;
      notes: string;
      weight: string;
    }[];
  };
};

type DrugRecommendationsQuery = {
  consultationId: string | number;
};

export const drugRecommendationsKeys = {
  all: ["DRUG_RECOMMENDATION"],
  lists: () => [...drugRecommendationsKeys.all, "LISTS"],
  list: (query: DrugRecommendationsQuery) => [
    ...drugRecommendationsKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getDrugRecommendations({
  fetch,
  query,
}: FetcherArgs<DrugRecommendationsQuery>) {
  const url = `${ENV.API}/tcore/integrations/drug-recommendations`;
  return await fetch.get<DrugRecommendations>(url, { params: query });
}

export type DrugRecommendationsCache = Awaited<
  ReturnType<typeof getDrugRecommendations>
>;

export function useDrugRecommendations<TData = DrugRecommendationsCache>(
  query: DrugRecommendationsQuery,
  options?: UseQueryOptions<DrugRecommendationsCache, FetchError, TData>
) {
  return useQuery<DrugRecommendationsCache, FetchError, TData>(
    drugRecommendationsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getDrugRecommendations({ fetch, query });
    },
    options
  );
}
