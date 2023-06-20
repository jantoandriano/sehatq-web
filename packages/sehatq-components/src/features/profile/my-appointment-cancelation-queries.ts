import { useQuery } from "react-query";
import { createBrowserFetch, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import {
  modelMyAppointmentCancelationOptions,
  MyAppointmentCancelationOptionsResponse,
} from "./my-appointment-cancelation-model";

export const cancelationReasonsKeys = {
  all: ["MY_APPOINTMENT_CANCELATION"],
  lists: () => [...cancelationReasonsKeys.all, "LISTS"],
  list: () => [...cancelationReasonsKeys.lists()],
};

export async function getMyAppointmentCancelationOptions({
  fetch,
}: OptionalFetcherArgs) {
  const result = await fetch.get<MyAppointmentCancelationOptionsResponse>(
    `${ENV.API}/booking/cancel-reasons`
  );

  return modelMyAppointmentCancelationOptions(result.data);
}

export type MyAppointmentCancelationOptionsCache = Awaited<
  ReturnType<typeof getMyAppointmentCancelationOptions>
>;

export function useGetMyAppointmentCancelationOptions<
  TData = MyAppointmentCancelationOptionsCache
>(select?: (data: MyAppointmentCancelationOptionsCache) => TData) {
  return useQuery<MyAppointmentCancelationOptionsCache, FetchError, TData>(
    cancelationReasonsKeys.list(),
    async () => {
      const fetch = createBrowserFetch();
      return getMyAppointmentCancelationOptions({ fetch });
    },
    { select }
  );
}
