import React from "react";

import { Skeleton, Text, HStack, TimeIcon } from "../../user-interfaces";

export type ConsultationDurationInfoDesktopProps = {
  duration: number;
};

export function ConsultationDurationInfoDesktop(
  props: ConsultationDurationInfoDesktopProps
) {
  const { duration } = props;
  return (
    <HStack
      align="flex-start"
      borderRadius="lg"
      background="iceBlue.500"
      width="full"
      px={4}
      py={3}
    >
      <TimeIcon
        boxSize="20px"
        background="sea.500"
        color="white"
        borderRadius="full"
      />
      <Text fontSize="sm" width="100%">
        Waktu konsultasi{" "}
        <Text as="span" fontSize="sm" d="inline" fontWeight="bold">
          {duration} menit{" "}
        </Text>
        setelah dimulai
      </Text>
    </HStack>
  );
}

export function ConsultationDurationInfoDesktopSkeleton() {
  return (
    <HStack
      borderRadius="lg"
      background="iceBlue.500"
      width="full"
      px={4}
      py={3}
    >
      <TimeIcon
        boxSize="20px"
        background="sea.500"
        color="white"
        borderRadius="full"
      />
      <Skeleton height="20px" width="226px" />
    </HStack>
  );
}
