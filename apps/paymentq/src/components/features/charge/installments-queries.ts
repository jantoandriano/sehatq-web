import { useQuery, UseQueryOptions } from "react-query";
import { FetcherArgs } from "@sehatq/components";
import { queryToString, cleanQuery } from "@sehatq/utils";
import { createBrowserFetch, FetchError } from "@utils";
import { ENV } from "@constants";
import { modelInstallments, InstallmentsResponse } from "./installments-model";

type InstallmentsQuery = {
  page: string;
  perPage: string;
  binCode: string;
  orderAmount: string;
};

export const installmentsKeys = {
  all: ["INSTALLMENTS"],
  lists: () => [...installmentsKeys.all, "LISTS"],
  list: (query: InstallmentsQuery) => [
    ...installmentsKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getInstallments({
  fetch,
  query,
}: FetcherArgs<InstallmentsQuery>) {
  const result = await fetch.get<InstallmentsResponse>(
    `${ENV.API}/v1/payment-service/cf/installment-options${queryToString(
      query
    )}`,
    { headers: { Authorization: `Basic ${ENV.TOKEN_BASIC}` } }
  );
  return {
    data: modelInstallments(result),
  };
}
export type InstallmentsCache = Awaited<ReturnType<typeof getInstallments>>;

export function useGetInstallments<TData = InstallmentsCache>(
  query: InstallmentsQuery,
  options?: UseQueryOptions<InstallmentsCache, FetchError, TData>
) {
  return useQuery<InstallmentsCache, FetchError, TData>(
    installmentsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getInstallments({ fetch, query });
    },
    options
  );
}
