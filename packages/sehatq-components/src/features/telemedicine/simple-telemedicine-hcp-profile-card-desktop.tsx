import React from "react";
import {
  Text,
  HStack,
  VStack,
  Divider,
  Box,
  ExperienceIcon,
  SkeletonCircle,
  Skeleton,
  StarRating,
} from "../../user-interfaces";

export type SimpleTelemedicineHCPProfileCardDesktopProps = {
  doctor: {
    name: string;
    experience: string;
    specialityName: string;
    displayPrice: string;
    consultationFee: string;
    ratingAverage: number;
    ratingTotal: number;
  };
  doctorImage: React.ReactElement;
};

export function SimpleTelemedicineHCPProfileCardDesktop(
  props: SimpleTelemedicineHCPProfileCardDesktopProps
) {
  const { doctor, doctorImage } = props;
  return (
    <Box>
      <HStack spacing={3} align="start">
        {doctorImage}
        <VStack align="start" spacing={0} flex={1}>
          <Text fontFamily="poppins" fontWeight="semibold" fontSize="sm">
            {doctor.name}
          </Text>
          <Text color="brownGrey.500" fontSize="xs">
            {doctor.specialityName}
          </Text>
        </VStack>
      </HStack>

      <HStack
        spacing={4}
        boxShadow="xs"
        borderRadius="base"
        p={2.5}
        mt={4}
        marginBottom={6}
        divider={
          <Divider
            borderColor="veryLightPink"
            border="solid 0.5px"
            orientation="vertical"
            height="41px"
          />
        }
        justify="space-evenly"
        width="full"
      >
        <Box>
          <Text color="brownGrey.500" fontSize="xs">
            Pengalaman
          </Text>
          <HStack spacing={1}>
            <ExperienceIcon boxSize="22px" />
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="capitalize"
            >
              {doctor.experience}
            </Text>
          </HStack>
        </Box>
        <Box>
          <Text color="brownGrey.500" fontSize="xs">
            Rating
          </Text>
          <HStack>
            <StarRating
              rating={doctor.ratingAverage}
              ratingTotal={doctor.ratingTotal}
              useSingleStar
              iconWidth={4}
              iconHeight={4}
              fontSize="sm"
            />
          </HStack>
        </Box>
      </HStack>

      <Text fontFamily="poppins" fontWeight="semibold" marginBottom={1}>
        Biaya Chat Online
      </Text>
      <HStack spacing={2}>
        <Text fontWeight="bold" fontSize="xl" color="sea.500">
          {doctor.consultationFee}
        </Text>
        {doctor.displayPrice && (
          <Text
            fontSize="sm"
            color="brownGrey.500"
            textDecoration="line-through"
          >
            {doctor.displayPrice}
          </Text>
        )}
      </HStack>
    </Box>
  );
}

export function SimpleTelemedicineHCPProfileCardDesktopSkeleton() {
  return (
    <Box>
      <HStack spacing={3} align="start" width="full">
        <SkeletonCircle width="64px" height="64px" />
        <VStack align="start" spacing={1} flex={1}>
          <Skeleton width="full" height="20px" />
          <Skeleton width="30%" height="20px" />
          <Skeleton width="50%" height="14px" />
        </VStack>
      </HStack>

      <HStack
        spacing={4}
        boxShadow="xs"
        borderRadius="base"
        p={2.5}
        mt={4}
        marginBottom={6}
        divider={
          <Divider
            borderColor="veryLightPink"
            border="solid 0.5px"
            orientation="vertical"
            height="41px"
          />
        }
        justify="space-evenly"
        width="full"
      >
        <VStack spacing={1} align="start">
          <Skeleton width="full" height="14px" />
          <HStack spacing={1}>
            <SkeletonCircle width="22px" height="22px" />
            <Skeleton width="55px" height="16px" />
          </HStack>
        </VStack>
        <VStack spacing={1} align="start">
          <Skeleton width="50%" height="14px" />
          <HStack spacing={1}>
            <SkeletonCircle width="22px" height="22px" />
            <Skeleton width="55px" height="16px" />
          </HStack>
        </VStack>
      </HStack>

      <Skeleton width="150px" height="20px" marginBottom={2} />
      <HStack spacing={2}>
        <Skeleton width="100px" height="26px" />
        <Skeleton width="65px" height="18px" />
      </HStack>
    </Box>
  );
}
