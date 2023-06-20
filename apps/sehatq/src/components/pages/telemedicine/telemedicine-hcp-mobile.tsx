import React from "react";
import {
  Flex,
  Box,
  Text,
  IconButton,
  ArrowBackIcon,
  TelemedicineHcpProfileCard,
  TelemedicineHCPCurrentSchedule,
  TelemedicineHCPProfileContent,
  TelemedicineHCPActions,
  TelemedicineHCPExperienceRating,
} from "@sehatq/components";
import { useNavigation } from "@sehatq/utils";
import { TelemedicineHCPHead } from "@components/head";

export interface TelemedicineHCPMobileProps {
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
}

export function TelemedicineHCPMobile(props: TelemedicineHCPMobileProps) {
  const {
    doctorSlug,
    indicator,
    isPrivateChannel,
    isBookingChannel,
    hasDoctorNextSchedule,
    getNotificationToken,
    doctorRecommendationId,
  } = props;
  const { goBack } = useNavigation();
  return (
    <>
      <TelemedicineHCPHead />
      <Flex
        p={2}
        bgColor="white"
        align="center"
        alignSelf="flex-start"
        position="sticky"
        zIndex="sticky"
        top={0}
      >
        <IconButton
          aria-label="back button"
          onClick={goBack}
          variant="fit"
          colorScheme="sea"
          icon={<ArrowBackIcon w={7} h={7} color="sea.600" />}
        />
        <Text
          flex="1"
          marginLeft={3}
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="md"
        >
          Profil Dokter
        </Text>
      </Flex>
      <Box minHeight="calc(100vh - 86px)">
        <Box p={4}>
          <Box mb={4}>
            <TelemedicineHcpProfileCard
              doctorSlug={doctorSlug}
              isMobile={true}
            />
          </Box>
          <Flex
            boxShadow="xs"
            borderRadius="base"
            py={3}
            justify="space-evenly"
            width="full"
          >
            <TelemedicineHCPExperienceRating
              doctorSlug={doctorSlug}
              isMobile={true}
            />
          </Flex>
        </Box>
        {(isPrivateChannel || isBookingChannel) && hasDoctorNextSchedule ? (
          <Box
            px={4}
            pb={4}
            mb={4}
            borderBottom="10px solid"
            borderColor="#f3f3f3"
          >
            <TelemedicineHCPCurrentSchedule
              getNotificationToken={getNotificationToken}
              doctorSlug={doctorSlug}
              isMobile={true}
            />
          </Box>
        ) : null}
        <Box px={4} pb={20}>
          <TelemedicineHCPProfileContent
            doctorSlug={doctorSlug}
            isMobile={true}
          />
        </Box>
        {hasDoctorNextSchedule &&
        (isBookingChannel ||
          (isPrivateChannel && isBookingChannel) ||
          (isPrivateChannel && indicator === "green")) ? (
          <Box
            p={4}
            width="100%"
            background="white"
            boxShadow="0 -2px 12px 0 rgba(0, 0, 0, 0.1)"
            position="fixed"
            bottom={0}
            left={0}
          >
            <TelemedicineHCPActions
              doctorSlug={doctorSlug}
              doctorRecommendationId={doctorRecommendationId}
              isMobile={true}
            />
          </Box>
        ) : null}
      </Box>
    </>
  );
}
