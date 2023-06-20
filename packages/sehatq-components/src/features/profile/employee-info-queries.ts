import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import { ModelEmployeeInfo, EmployeeInfoResponse } from "./employee-info-model";

export const employeeInfoKeys = {
  all: ["EMPLOYEE_INFO"],
};

export async function getEmployeeInfo({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<EmployeeInfoResponse>(
    `${ENV.API}/company-service/sehatq/employee-info`
  );
  return ModelEmployeeInfo(result.data);
}

export type EmployeeInfoCache = Awaited<ReturnType<typeof getEmployeeInfo>>;

export function useGetEmployeeInfo<TData = EmployeeInfoCache>(
  options?: UseQueryOptions<EmployeeInfoCache, FetchError, TData>
) {
  return useQuery<EmployeeInfoCache, FetchError, TData>(
    employeeInfoKeys.all,
    async () => {
      const fetch = createBrowserFetch();
      return getEmployeeInfo({ fetch });
    },
    {
      ...options,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
}
