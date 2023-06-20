import React from "react";
import {
  Flex,
  Box,
  Text,
  SimpleBlock,
  TelemedicineHcpProfileCard,
  TelemedicineHCPProfileContent,
  TelemedicineHCPCurrentSchedule,
  TelemedicineHCPExperienceRating,
  TelemedicineHCPActions,
  SimpleSehatQFooter,
  GridBlockItem,
  GridBlock,
} from "@sehatq/components";
import { TelemedicineHCPHead } from "@components/head";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

type TelemedicineHCPDesktopProps = {
  doctorSlug: string;
  indicator?: string;
  isPrivateChannel?: boolean;
  isBookingChannel?: boolean;
  hasDoctorNextSchedule?: boolean;
  getNotificationToken: () => Promise<
    | {
        data: string | null;
        error: string | null;
      }
    | undefined
  >;
  doctorRecommendationId?: string;
};

export function TelemedicineHCPDesktop(props: TelemedicineHCPDesktopProps) {
  const {
    doctorSlug,
    indicator,
    isPrivateChannel,
    isBookingChannel,
    hasDoctorNextSchedule,
    getNotificationToken,
    doctorRecommendationId,
  } = props;
  return (
    <>
      <SehatqNavbar />
      <TelemedicineHCPHead />
      <Box minH="calc(100vh - 120px)" py={1}>
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
        <GridBlock my={5} isReverse>
          <GridBlockItem>
            <Box p={6} boxShadow="sm" borderRadius="2xl" mb={4}>
              <TelemedicineHcpProfileCard doctorSlug={doctorSlug} />
            </Box>
            <Box p={6} boxShadow="sm" borderRadius="2xl">
              <TelemedicineHCPProfileContent doctorSlug={doctorSlug} />
            </Box>
          </GridBlockItem>
          <GridBlockItem>
            <Flex
              boxShadow="sm"
              borderRadius="2xl"
              py="40px"
              justify="space-evenly"
              width="full"
            >
              <TelemedicineHCPExperienceRating doctorSlug={doctorSlug} />
            </Flex>
            {(isPrivateChannel || isBookingChannel) && hasDoctorNextSchedule ? (
              <Box p={6} my={4} boxShadow="sm" borderRadius="2xl">
                <TelemedicineHCPCurrentSchedule
                  doctorSlug={doctorSlug}
                  getNotificationToken={getNotificationToken}
                />
                {(isPrivateChannel && isBookingChannel) ||
                (isPrivateChannel && indicator === "green") ? (
                  <Box mt={4}>
                    <TelemedicineHCPActions
                      doctorSlug={doctorSlug}
                      doctorRecommendationId={doctorRecommendationId}
                    />
                  </Box>
                ) : null}
              </Box>
            ) : null}
          </GridBlockItem>
        </GridBlock>
      </Box>
      <Box marginTop={10}>
        <SimpleSehatQFooter />
      </Box>
    </>
  );
}
