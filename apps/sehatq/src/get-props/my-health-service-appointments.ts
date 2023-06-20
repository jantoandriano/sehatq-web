import { dehydrate, QueryClient } from "react-query";
import {
  getMyHealthServiceAppointments,
  MyHealthServiceAppointmentKeys,
  HealthServiceStatusCode,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type MyHealthServiceAppointmentsQuery = {
  status?: HealthServiceStatusCode;
};

export type MyHealthServiceAppointmentsParams = {
  userId: string;
  cookie: string;
};

export async function getMyHealthServiceAppointmentsProps(
  arg: MyHealthServiceAppointmentsQuery &
    MyHealthServiceAppointmentsParams & { isMobile: boolean }
) {
  const { userId = "", status = "", isMobile, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();
  const MyHealthServiceAppointmentsQuery = {
    userId,
    perPage: "5",
    page: "1",
    status,
  };
  await queryClient.prefetchInfiniteQuery(
    MyHealthServiceAppointmentKeys.infiniteList(
      MyHealthServiceAppointmentsQuery
    ),
    async () =>
      await getMyHealthServiceAppointments({
        fetch,
        query: MyHealthServiceAppointmentsQuery,
      })
  );
  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile };
}
