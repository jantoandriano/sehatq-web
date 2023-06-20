import { dehydrate, QueryClient } from "react-query";
import { addDays } from "date-fns";
import { createNodeFetch, nullify, formatDate } from "@sehatq/utils";
import {
  telemedicineDoctorsKeys,
  getTelemedicineDoctor,
  telemedicineHCPScheduleDaysKeys,
  getTelemedicineHCPScheduleDays,
} from "@sehatq/components";

export type TelemedicineHCPSchedulesParams = {
  slug: string;
};

export async function getTelemedicineHCPSchedulesProps(
  arg: {
    isMobile: boolean;
  } & TelemedicineHCPSchedulesParams
) {
  const { isMobile, slug } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();

  let error = null;
  let hasBookingChannel = false;
  let hasSchedule = true;

  try {
    const telemedicineHCPQuery = {
      doctorId: slug,
    };

    const telemedDoctor = await queryClient.fetchQuery(
      telemedicineDoctorsKeys.detail(telemedicineHCPQuery),
      async () =>
        await getTelemedicineDoctor({
          fetch,
          query: telemedicineHCPQuery,
        })
    );

    const TelemedicineHCPScheduleDaysQuery = {
      doctorId: `${telemedDoctor.data.id}`,
      range: 6,
      startDate: formatDate(addDays(new Date(), 1), "yyyy-MM-dd"),
    };

    hasBookingChannel = telemedDoctor.data.isBookingChannel;

    const telemedDoctorSchedules = await queryClient.fetchQuery(
      telemedicineHCPScheduleDaysKeys.list(TelemedicineHCPScheduleDaysQuery),
      async () =>
        await getTelemedicineHCPScheduleDays({
          fetch,
          query: TelemedicineHCPScheduleDaysQuery,
        })
    );

    hasSchedule = !!telemedDoctorSchedules.length;
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    hasBookingChannel,
    hasSchedule,
    error,
  };
}
