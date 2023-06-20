import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "@sehatq/components/src/types";

export const doctorAvailabilityKeys = {
  all: ["DOCTOR_AVAILABILITY"],
  details: () => [...doctorAvailabilityKeys.all, "DETAILS"],
  detail: () => [...doctorAvailabilityKeys.details()],
};

export async function getDoctorAvailability({ fetch }: OptionalFetcherArgs) {
  return await fetch.get(
    `${ENV.API}/telemed-service/b2b/doctors/check-availability`
  );
}

export type DoctorAvailabilityCache = Awaited<
  ReturnType<typeof getDoctorAvailability>
>;

export function useGetDoctorAvailability<TData = DoctorAvailabilityCache>(
  options?: UseQueryOptions<DoctorAvailabilityCache, FetchError, TData>
) {
  return useQuery<DoctorAvailabilityCache, FetchError, TData>(
    doctorAvailabilityKeys.details(),
    async () => {
      const fetch = createBrowserFetch();
      return getDoctorAvailability({ fetch });
    },
    options
  );
}
