import { dehydrate, QueryClient } from "react-query";
import {
  telemedicineDoctorsKeys,
  getTelemedicineDoctor,
  telemedicineHCPNextScheduleKeys,
  getTelemedicineHCPNextSchedule,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type TelemedicineHCPParams = {
  slug: string;
};

export async function getTelemedicineHCPProps(
  arg: TelemedicineHCPParams & { isMobile: boolean; cookie?: string }
) {
  const { isMobile, cookie, slug } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();

  let error = null;

  try {
    const TelemedicineHCPQuery = {
      doctorId: slug,
    };
    const doctor = await queryClient.fetchQuery(
      telemedicineDoctorsKeys.detail(TelemedicineHCPQuery),
      async () =>
        await getTelemedicineDoctor({
          fetch,
          query: TelemedicineHCPQuery,
        })
    );

    const TelemedicineHCPNextScheduleQuery = {
      doctorId: `${doctor?.data.id}`,
    };

    await Promise.all([
      queryClient.prefetchQuery(
        telemedicineHCPNextScheduleKeys.list(TelemedicineHCPNextScheduleQuery),
        async () =>
          await getTelemedicineHCPNextSchedule({
            fetch,
            query: TelemedicineHCPNextScheduleQuery,
          })
      ),
    ]);
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    error,
  };
}
