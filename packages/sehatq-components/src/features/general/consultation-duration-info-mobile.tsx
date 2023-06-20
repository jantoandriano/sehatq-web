import React from "react";

import { Skeleton, Text, HStack, TimeIcon } from "../../user-interfaces";

export type ConsultationDurationInfoMobileProps = {
  duration: number;
};

export function ConsultationDurationInfoMobile(
  props: ConsultationDurationInfoMobileProps
) {
  const { duration } = props;
  return (
    <HStack
      borderRadius="lg"
      background="iceBlue.500"
      width="full"
      px={3.5}
      py={3}
    >
      <TimeIcon boxSize="14px" color="sea.500" />
      <Text fontSize="xs" width="100%" fontWeight="semibold">
        Waktu konsultasi {duration} menit
      </Text>
    </HStack>
  );
}

export function ConsultationDurationInfoMobileSkeleton() {
  return (
    <HStack
      borderRadius="lg"
      background="iceBlue.500"
      width="full"
      px={3.5}
      py={3}
    >
      <TimeIcon boxSize="14px" color="sea.500" />
      <Skeleton height="16px" width="155px" />
    </HStack>
  );
}
