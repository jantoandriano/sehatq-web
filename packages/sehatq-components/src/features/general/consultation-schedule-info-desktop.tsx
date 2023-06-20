import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Flex,
  Skeleton,
  Text,
  Link,
  HStack,
  TelemedDateIcon,
  TimeIcon,
} from "../../user-interfaces";
export type ConsultationScheduleInfoDesktopProps = {
  doctorId: string;
  scheduleDay: string;
  scheduleTime: string;
};

export function ConsultationScheduleInfoDesktop(
  props: ConsultationScheduleInfoDesktopProps
) {
  const { doctorId, scheduleDay, scheduleTime } = props;
  const { Navigate } = useNavigation();
  return (
    <Box borderRadius="lg" boxShadow="sm" p={6} background="white" width="full">
      <Flex justify="space-between" align="center">
        <Text fontWeight="semibold" fontFamily="poppins" color="charcoalGrey">
          Jadwal Chat
        </Text>
        <Navigate name="TELEMED_HCP_SCHEDULE" query={{ id: doctorId }}>
          <Link
            variant="tab"
            color="sea.500"
            fontSize="sm"
            fontFamily="poppins"
            fontWeight="semibold"
            height="21px"
            p={0}
          >
            Ubah
          </Link>
        </Navigate>
      </Flex>
      <HStack spacing={2} mt={3}>
        <TelemedDateIcon boxSize="24px" />
        <Text color="charcoalGrey">{scheduleDay}</Text>
      </HStack>
      <HStack spacing={2} mt={1.5}>
        <TimeIcon boxSize="22px" color="sea.500" />
        <Text color="charcoalGrey">{scheduleTime}</Text>
      </HStack>
    </Box>
  );
}

export function ConsultationScheduleInfoDesktopSkeleton() {
  return (
    <Box borderRadius="lg" boxShadow="sm" p={6}>
      <Flex justify="space-between">
        <Skeleton height="24px" width="104px" />
        <Skeleton height="21px" width="38px" />
      </Flex>
      <HStack spacing={2} mt={3}>
        <TelemedDateIcon />
        <Skeleton height="22px" width="145px" />
      </HStack>
      <HStack spacing={2} mt={3}>
        <TimeIcon />
        <Skeleton height="22px" width="70px" />
      </HStack>
    </Box>
  );
}
