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
  MedicalProceduresResponse,
  modelMedicalProcedures,
  modelMetaMedicalProcedures,
} from "./medical-procedures-model";

type MedicalProceduresQuery = {
  page: string;
  perPage: string;
  tagSlug: string;
};

export const MedicalProcedureKeys = {
  all: ["MEDICAL_PROCEDURES"],
  lists: () => [...MedicalProcedureKeys.all, "LISTS"],
  list: (query: MedicalProceduresQuery) => [
    ...MedicalProcedureKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getMedicalProcedures({
  fetch,
  query,
}: FetcherArgs<MedicalProceduresQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<MedicalProceduresResponse>(
    `${ENV.API}/content/procedures${queryString}`
  );

  return {
    data: modelMedicalProcedures(result.data),
    meta: modelMetaMedicalProcedures(result.meta),
  };
}

export type MedicalProceduresCache = Awaited<
  ReturnType<typeof getMedicalProcedures>
>;

export function useGetMedicalProcedures<TData = MedicalProceduresCache>(
  query: MedicalProceduresQuery,
  options?: UseQueryOptions<MedicalProceduresCache, FetchError, TData>
) {
  return useQuery<MedicalProceduresCache, FetchError, TData>(
    MedicalProcedureKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getMedicalProcedures({ fetch, query });
    },
    options
  );
}
