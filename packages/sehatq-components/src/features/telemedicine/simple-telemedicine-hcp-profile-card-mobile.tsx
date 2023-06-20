import React from "react";
import {
  Text,
  HStack,
  VStack,
  SkeletonCircle,
  Skeleton,
} from "../../user-interfaces";

export type SimpleTelemedicineHCPProfileCardMobileProps = {
  doctor: {
    name: string;
    specialityName: string;
  };
  doctorImage: React.ReactElement;
};

export function SimpleTelemedicineHCPProfileCardMobile(
  props: SimpleTelemedicineHCPProfileCardMobileProps
) {
  const { doctor, doctorImage } = props;
  return (
    <HStack spacing={3} align="start">
      {doctorImage}
      <VStack align="start" spacing={0} flex={1}>
        <Text fontFamily="poppins" fontWeight="semibold">
          {doctor.name}
        </Text>
        <Text color="sea.500" fontSize="xs">
          {doctor.specialityName}
        </Text>
      </VStack>
    </HStack>
  );
}

export function SimpleTelemedicineHCPProfileCardMobileSkeleton() {
  return (
    <HStack spacing={3} align="start">
      <SkeletonCircle width="64px" height="64px" />
      <VStack align="start" spacing={1} flex={1}>
        <Skeleton width="100%" height="20px" />
        <Skeleton width="30%" height="20px" />
        <Skeleton width="50%" height="14px" />
      </VStack>
    </HStack>
  );
}
