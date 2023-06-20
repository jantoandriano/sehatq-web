import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Box,
  Skeleton,
  Flex,
  Text,
  Button,
  NotificationIcon,
} from "../../user-interfaces";

export type TelemedicineHCPCurrentScheduleMobileProps = {
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

export function TelemedicineHCPCurrentScheduleMobile(
  props: TelemedicineHCPCurrentScheduleMobileProps
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
        fontSize="md"
        fontFamily="poppins"
        fontWeight="semibold"
        mb={3}
      >
        {dataNextSchedule.title}
      </Text>
      <Flex
        align="center"
        justify="space-between"
        backgroundImage={ASSETS.BG_JADWAL_CHAT}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        px={4}
        py={3}
      >
        {dataNextSchedule.data.schedules.length > 0 && (
          <Box>
            <Text
              fontSize="sm"
              color="charcoalGrey"
              mb="1"
              textTransform="capitalize"
            >
              {`${dataNextSchedule.data.day}, ${dataNextSchedule.data.date}`}
            </Text>
            <Text fontSize="md" fontWeight="semibold" color="charcoalGrey">
              {`${dataNextSchedule.data.schedules[0].startAt} - ${dataNextSchedule.data.schedules[0].endAt} WIB`}
            </Text>
          </Box>
        )}
        {showRemindMeButton ? (
          hasReminder ? (
            <Button
              size="sm"
              variant="outline"
              colorScheme="main"
              color="charcoalGrey"
              borderColor="veryLightPink"
              background="white"
              paddingX={2}
              onClick={unRemindMe}
              isLoading={isLoading}
            >
              Hapus Pengingat
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              colorScheme="main"
              color="sea.500"
              borderColor="main.500"
              background="white"
              paddingX={2}
              leftIcon={<NotificationIcon boxSize={4} />}
              onClick={remindMe}
              isLoading={isLoading}
            >
              Ingatkan Saya
            </Button>
          )
        ) : null}
      </Flex>
    </>
  );
}

export function TelemedicineHCPCurrentScheduleMobileSkeleton() {
  const ASSETS = useAssets(["BG_JADWAL_CHAT"]);

  return (
    <>
      <Skeleton width="80%" height="18px" mb={4} />
      <Box
        backgroundImage={ASSETS.BG_JADWAL_CHAT}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        width="full"
        px={4}
        py={3}
      >
        <Box>
          <Skeleton width="70%" height="16px" mb={2} />
          <Skeleton width="60%" height="18px" />
        </Box>
      </Box>
    </>
  );
}
