import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Text,
  SimpleBlock,
  SimpleTelemedicineHCPProfileCard,
  TelemedicineHCPSchedules,
  BookTelemedicineHCPSchedule,
  SimpleSehatQFooter,
  GridBlockItem,
  GridBlock,
} from "@sehatq/components";
import { TelemedicineHCPSchedulesHead } from "@components/head";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

type TelemedicineHCPSchedulesDesktopProps = {
  doctorSlug: string;
  doctorId: number;
  doctorScheduleId?: number;
  bookingDate?: string;
  setDoctorScheduleId: Dispatch<SetStateAction<number | undefined>>;
  setBookingDate: Dispatch<SetStateAction<string | undefined>>;
  doctorRecommendationId?: string;
};

export function TelemedicineHCPSchedulesDesktop(
  props: TelemedicineHCPSchedulesDesktopProps
) {
  return (
    <>
      <SehatqNavbar />
      <TelemedicineHCPSchedulesHead />
      <Box minH="calc(100vh - 120px - 93px)" py={1}>
        <SimpleBlock mt={7}>
          <Text
            as="h1"
            fontSize="3xl"
            fontFamily="poppins"
            fontWeight="semibold"
          >
            Profil Dokter
          </Text>
        </SimpleBlock>
        <GridBlock my={6} isReverse>
          <GridBlockItem>
            <TelemedicineHCPSchedules {...props} />
          </GridBlockItem>
          <GridBlockItem>
            <Box p={6} boxShadow="sm" borderRadius="xl">
              <Text
                fontSize="lg"
                fontFamily="poppins"
                fontWeight="semibold"
                marginBottom={3}
              >
                Informasi Dokter
              </Text>
              <SimpleTelemedicineHCPProfileCard {...props} />
              <Box marginTop={6}>
                <BookTelemedicineHCPSchedule {...props} />
              </Box>
            </Box>
          </GridBlockItem>
        </GridBlock>
      </Box>
      <Box marginTop={10}>
        <SimpleSehatQFooter />
      </Box>
    </>
  );
}
