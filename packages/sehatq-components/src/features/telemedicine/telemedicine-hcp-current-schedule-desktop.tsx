import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Box,
  Skeleton,
  Text,
  Button,
  SolidNotificationIcon,
} from "../../user-interfaces";

export type TelemedicineHCPCurrentScheduleDesktopProps = {
  showRemindMeButton: boolean;
  isLoading: boolean;
  remindMe: () => void;
  unRemindMe: () => void;
  hasReminder: boolean;
  dataNextSchedule: {
    title: string;
    data: {
      date: string;
      day: string;
      schedules: {
        doctorScheduleId: number;
        startAt: string;
        endAt: string;
      }[];
    };
  };
};

export function TelemedicineHCPCurrentScheduleDesktop(
  props: TelemedicineHCPCurrentScheduleDesktopProps
) {
  const ASSETS = useAssets(["BG_JADWAL_CHAT"]);
  const {
    dataNextSchedule,
    showRemindMeButton,
    remindMe,
    unRemindMe,
    hasReminder,
    isLoading,
  } = props;

  return (
    <>
      <Text
        color="charcoalGrey"
        fontSize="lg"
        fontFamily="poppins"
        fontWeight="semibold"
        mb={4}
      >
        {dataNextSchedule.title}
      </Text>
      {dataNextSchedule.data.schedules.length > 0 && (
        <Box
          backgroundImage={ASSETS.BG_JADWAL_CHAT}
          backgroundRepeat="no-repeat"
          justifyContent="flex-start"
          backgroundSize="cover"
          backgroundPosition="center center"
          borderRadius="lg"
          px={4}
          py={3}
          mb={4}
        >
          <Text
            fontSize="md"
            color="charcoalGrey"
            mb="1"
            textTransform="capitalize"
          >
            {`${dataNextSchedule.data.day}, ${dataNextSchedule.data.date}`}
          </Text>
          <Text fontSize="lg" fontWeight="semibold" color="charcoalGrey">
            {`${dataNextSchedule.data.schedules[0].startAt} - ${dataNextSchedule.data.schedules[0].endAt} WIB`}
          </Text>
        </Box>
      )}
      {showRemindMeButton ? (
        hasReminder ? (
          <Button
            isFullWidth
            variant="outline"
            colorScheme="main"
            color="charcoalGrey"
            borderColor="veryLightPink"
            background="white"
            onClick={unRemindMe}
            isLoading={isLoading}
          >
            Hapus Pengingat
          </Button>
        ) : (
          <Button
            isFullWidth
            colorScheme="main"
            onClick={remindMe}
            isLoading={isLoading}
            leftIcon={<SolidNotificationIcon boxSize={4} />}
          >
            Ingatkan Saya
          </Button>
        )
      ) : null}
    </>
  );
}

export function TelemedicineHCPCurrentScheduleDesktopSkeleton() {
  const ASSETS = useAssets(["BG_JADWAL_CHAT"]);

  return (
    <>
      <Skeleton width="80%" height="20px" mb={6} />
      <Box
        backgroundImage={ASSETS.BG_JADWAL_CHAT}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        width="full"
        borderRadius="lg"
        px={4}
        py={3}
      >
        <Box>
          <Skeleton width="70%" height="16px" mb={3} />
          <Skeleton width="60%" height="20px" />
        </Box>
      </Box>
    </>
  );
}
