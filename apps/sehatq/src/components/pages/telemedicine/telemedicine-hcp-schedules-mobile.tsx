import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  SimpleTelemedicineHCPProfileCard,
  TelemedicineHCPSchedules,
  BookTelemedicineHCPSchedule,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { TelemedicineHCPSchedulesHead } from "@components/head";

type TelemedicineHCPSchedulesMobileProps = {
  doctorSlug: string;
  doctorId: number;
  doctorScheduleId?: number;
  bookingDate?: string;
  setDoctorScheduleId: Dispatch<SetStateAction<number | undefined>>;
  setBookingDate: Dispatch<SetStateAction<string | undefined>>;
  doctorRecommendationId?: string;
};

export function TelemedicineHCPSchedulesMobile(
  props: TelemedicineHCPSchedulesMobileProps
) {
  return (
    <>
      <TelemedicineHCPSchedulesHead />
      <SehatQHeader variant="text" text="Pilih Jadwal Konsultasi" />
      <Box px={4} py={5}>
        <SimpleTelemedicineHCPProfileCard {...props} isMobile />
      </Box>
      <Box bgColor="gray.500" height="10px" />
      <Box pt={4} pb={20}>
        <TelemedicineHCPSchedules {...props} isMobile />
      </Box>
      <Box
        p={4}
        width="100%"
        background="white"
        boxShadow="0 -2px 12px 0 rgba(0, 0, 0, 0.1);"
        position="fixed"
        bottom={0}
        left={0}
      >
        <BookTelemedicineHCPSchedule {...props} isMobile />
      </Box>
    </>
  );
}
