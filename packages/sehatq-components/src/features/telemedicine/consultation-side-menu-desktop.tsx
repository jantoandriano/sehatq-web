import React from "react";
import { priceFormat, mappingSpecialityName } from "@sehatq/utils";

import {
  Box,
  Text,
  HStack,
  ExperienceIcon,
  IconButton,
  StarRating,
  Skeleton,
  SkeletonCircle,
  Badge,
} from "../../user-interfaces";
import { Content } from "../layout";

export type ConsultationSideMenuDesktopProps = {
  doctor?: {
    slug: string;
    name: string;
    photoUrl: string;
    experience: string;
    specialityName: string;
    str: string;
    sip: string;
    description: string;
    hospitalName: string;
    displayPrice: number;
    consultationFee: number;
    ratingAverage: number;
    ratingTotal: number;
    indicator: string;
  };
  doctorImage: React.ReactElement;
};

export function ConsultationSideMenuDesktop(
  props: ConsultationSideMenuDesktopProps
) {
  const { doctor, doctorImage } = props;
  return (
    <>
      {doctor && (
        <Box boxShadow="base" borderRadius="lg" p={4} background="white">
          <Text fontFamily="poppins" fontWeight="semibold">
            Informasi Dokter
          </Text>
          <HStack spacing={4} py={4}>
            <Box textAlign="center" position="relative">
              {doctorImage}
              {doctor.indicator === "green" ? (
                <Badge
                  background="shamrock.500"
                  px={2.5}
                  size="sm"
                  textTransform="capitalize"
                  position="absolute"
                  top="80px"
                  left="20px"
                >
                  Online
                </Badge>
              ) : null}
            </Box>
            <Box>
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="sm"
                lineHeight="5"
              >
                {doctor.name}
              </Text>
              <Text fontSize="xs" color="brownGrey.500">
                {mappingSpecialityName(doctor.specialityName)}
              </Text>
              <Text fontWeight="semibold" fontSize="xs">
                {doctor.hospitalName}
              </Text>
              <HStack spacing={1}>
                <Text fontWeight="bold" color="sea.500">
                  {priceFormat(doctor.consultationFee)}
                </Text>
                <Text
                  fontSize="sm"
                  color="brownGrey.500"
                  textDecoration="line-through"
                >
                  {priceFormat(doctor.displayPrice)}
                </Text>
              </HStack>
            </Box>
          </HStack>
          <Box boxShadow="lg" borderRadius="base" p={2.5} mb={4}>
            <HStack spacing={4} mb={3}>
              <Box>
                <Text color="brownGrey.500" fontSize="xs">
                  Pengalaman
                </Text>
                <HStack spacing={1}>
                  <IconButton
                    variant="fit"
                    icon={<ExperienceIcon boxSize="22px" />}
                    aria-label="experience-icon"
                  />
                  <Text fontSize="sm">({doctor.experience})</Text>
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
            <Box px={3} py={2} background="iceBlue.500" borderRadius="base">
              <Text fontWeight="semibold" fontSize="xs">
                No. SIP
              </Text>
              <Text fontSize="xs">{doctor.sip}</Text>
            </Box>
          </Box>
          <Content>{doctor.description}</Content>
        </Box>
      )}
    </>
  );
}

export function ConsultationSideMenuSkeletonDesktop() {
  return (
    <Box boxShadow="blue-base" borderRadius="lg" p={4}>
      <Text fontFamily="poppins" fontWeight="semibold">
        Informasi Dokter
      </Text>
      <HStack spacing={4} py={4}>
        <SkeletonCircle width="90px" height="90px" />
        <Box>
          <Skeleton width="160px" height="39px" mb={0.5} />
          <Skeleton width="80px" height="16px" mb={0.5} />
          <HStack spacing={1}>
            <Skeleton width="80px" height="23px" mb={0.5} />
            <Skeleton width="69px" height="18px" />
          </HStack>
        </Box>
      </HStack>
      <Box boxShadow="lg" borderRadius="base" p={2.5} mb={4}>
        <HStack spacing={4} mb={3}>
          <Box>
            <Text color="brownGrey.500" fontSize="xs">
              Pengalaman
            </Text>
            <HStack spacing={1}>
              <IconButton
                variant="fit"
                icon={<ExperienceIcon boxSize="22px" />}
                aria-label="experience-icon"
              />
              <Skeleton width="62px" height="19px" />
            </HStack>
          </Box>
          <Box>
            <Text color="brownGrey.500" fontSize="xs">
              Rating
            </Text>
            <HStack>
              <Skeleton width="53px" height="19px" />
            </HStack>
          </Box>
        </HStack>
        <Box px={3} py={2} background="iceBlue.500" borderRadius="base">
          <Skeleton width="220px" height="34px" />
        </Box>
      </Box>
      <Skeleton width="264px" height="60px" />
    </Box>
  );
}
