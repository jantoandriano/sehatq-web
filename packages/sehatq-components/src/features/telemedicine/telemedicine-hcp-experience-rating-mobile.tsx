import React from "react";
import {
  HStack,
  Skeleton,
  Text,
  StarIcon,
  VStack,
  DoctorExperienceIcon,
} from "../../user-interfaces";

export type TelemedicineHCPExperienceRatingMobileProps = {
  doctor?: {
    experience: string;
    ratingAverage: number;
    ratingTotal: number;
  };
};

export function TelemedicineHCPExperienceRatingMobile(
  props: TelemedicineHCPExperienceRatingMobileProps
) {
  const { doctor } = props;

  return (
    <>
      {doctor && (
        <>
          <VStack
            spacing={1}
            flex={1}
            borderRight="0.5px solid"
            borderRightColor="veryLightPink"
          >
            <Text color="brownGrey.500" fontSize="xs">
              Pengalaman
            </Text>
            <HStack spacing={1}>
              <DoctorExperienceIcon boxSize="16px" />
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textTransform="capitalize"
              >
                {doctor.experience}
              </Text>
            </HStack>
          </VStack>
          <VStack spacing={1} flex={1}>
            <Text color="brownGrey.500" fontSize="xs">
              Rating
            </Text>
            <HStack spacing={1}>
              <StarIcon color="squash.500" width="16px" height="16px" />
              <Text fontSize="sm" color="charcoalGrey" fontWeight="semibold">
                {doctor.ratingAverage}
              </Text>
              <Text fontSize="sm" color="brownGrey.500">
                ({doctor.ratingTotal})
              </Text>
            </HStack>
          </VStack>
        </>
      )}
    </>
  );
}

export function TelemedicineHCPExperienceRatingMobileSkeleton() {
  return (
    <>
      <Skeleton width="277px" height="24px" mb={2.5} />
    </>
  );
}
