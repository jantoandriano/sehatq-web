import React from "react";
import {
  HStack,
  VStack,
  Skeleton,
  Text,
  StarIcon,
  DoctorExperienceIcon,
} from "../../user-interfaces";

export type TelemedicineHCPExperienceRatingDesktopProps = {
  doctor?: {
    experience: string;
    ratingAverage: number;
    ratingTotal: number;
  };
};

export function TelemedicineHCPExperienceRatingDesktop(
  props: TelemedicineHCPExperienceRatingDesktopProps
) {
  const { doctor } = props;

  return (
    <>
      {doctor && (
        <>
          <VStack
            spacing={1}
            flex={1}
            borderRight="1px solid"
            borderRightColor="#ececec"
          >
            <DoctorExperienceIcon boxSize="24px" />
            <Text color="brownGrey.500" fontSize="sm">
              Pengalaman
            </Text>
            <Text
              fontSize="md"
              fontWeight="semibold"
              textTransform="capitalize"
              color="charcoalGrey"
            >
              {doctor.experience}
            </Text>
          </VStack>
          <VStack spacing={1} flex={1}>
            <StarIcon color="squash.500" width="24px" height="24px" />
            <Text color="brownGrey.500" fontSize="sm">
              Rating
            </Text>
            <HStack spacing={1}>
              <Text fontSize="md" color="charcoalGrey" fontWeight="semibold">
                {doctor.ratingAverage}
              </Text>
              <Text fontSize="md" color="brownGrey.500">
                ({doctor.ratingTotal})
              </Text>
            </HStack>
          </VStack>
        </>
      )}
    </>
  );
}

export function TelemedicineHCPExperienceRatingDesktopSkeleton() {
  return (
    <>
      <Skeleton width="277px" height="24px" mb={2.5} />
    </>
  );
}
