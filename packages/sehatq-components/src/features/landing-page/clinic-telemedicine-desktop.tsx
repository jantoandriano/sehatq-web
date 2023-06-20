import React from "react";

import { useNavigation, priceFormat, NavigationValue } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  HStack,
  Link,
  Icon,
  ArrowForwardIcon,
  LinkOverlay,
  LinkBox,
  StarRating,
  DoctorExperienceIcon,
} from "../../user-interfaces";
import { ClinicCarousel } from "./clinic-carousel";

type ClinicTelemedicineDesktopProps = {
  title: string;
  telemedicinesNavigation?: NavigationValue;
  telemed: {
    id: number;
    slug: string;
    name: string;
    photoUrl: string;
    specialityName: string;
    rating: {
      average: number;
      count: number;
    };
    experience: string;
    consultationFee: number;
    indicator: string;
    isBookingChannel: boolean;
    isPrivateChannel: boolean;
  }[];
};

export function ClinicTelemedicineDesktop(
  props: ClinicTelemedicineDesktopProps
) {
  const { title, telemedicinesNavigation, telemed } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Text fontSize="3xl" fontWeight="bold" fontFamily="poppins">
          {title}
        </Text>
        {telemedicinesNavigation && (
          <Navigate {...telemedicinesNavigation}>
            <Link
              fontSize="sm"
              fontFamily="poppins"
              color="#279091"
              fontWeight="semibold"
            >
              Lihat Semua Dokter
              <Icon as={ArrowForwardIcon} h={3} w={3} ml={3.5} />
            </Link>
          </Navigate>
        )}
      </Flex>
      <ClinicCarousel
        slides={telemed}
        slideGap={4}
        slidesToShow={4}
        renderSlide={({ slide }) => (
          <LinkBox
            key={slide.id}
            flex="1"
            height="calc(100% - 15px)"
            w="full"
            bgColor="white"
            boxShadow="base"
            borderRadius="lg"
            p={3}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            mt={1}
            mb={3}
            gap={2}
          >
            <Flex justifyContent="space-between" alignItems="center" gap={1}>
              <Navigate name="TELEMED_DOCTOR" query={{ slug: slide.slug }}>
                <LinkOverlay
                  fontSize="sm"
                  fontFamily="poppins"
                  fontWeight="semibold"
                >
                  {slide.name}
                </LinkOverlay>
              </Navigate>
              <Box>
                <Image
                  src={slide.photoUrl}
                  alt={slide.name}
                  layout="fill"
                  objectFit="cover"
                  sizes="56px"
                  wrapperProps={{
                    boxSize: 14,
                    position: "relative",
                    borderRadius: "full",
                    overflow: "hidden",
                  }}
                />
              </Box>
            </Flex>
            <Box>
              <Text fontSize="xs" fontFamily="poppins" mb={1} color="sea.500">
                {slide.specialityName}
              </Text>
              <Flex alignItems="center">
                <HStack spacing={1} mr={3}>
                  <StarRating
                    rating={
                      slide.rating.average
                        ? Math.round(slide.rating.average * 10) / 10
                        : 0
                    }
                    useSingleStar
                    iconWidth="10.5px"
                    iconHeight="10.5px"
                    fontSize="xs"
                  />
                  {slide.rating.count && (
                    <Text
                      fontSize="xs"
                      color="brownGrey.500"
                      whiteSpace="nowrap"
                    >
                      ({slide.rating.count})
                    </Text>
                  )}
                </HStack>
                {slide.experience.toLowerCase() !== "0 tahun" ? (
                  <HStack spacing={1}>
                    <DoctorExperienceIcon boxSize="10px" />
                    <Text
                      fontSize="xs"
                      color="brownGrey.500"
                      fontWeight="semibold"
                    >
                      {slide.experience}
                    </Text>
                  </HStack>
                ) : null}
              </Flex>
            </Box>
            <Box>
              <Text fontSize="xxs" color="brownGrey.500" mb={0.5}>
                Mulai dari
              </Text>
              <Text color="#269090" fontWeight="bold" fontSize="18px" mb={3}>
                {slide.consultationFee
                  ? priceFormat(slide.consultationFee)
                  : ""}
              </Text>
              <Navigate name="TELEMED_DOCTOR" query={{ slug: slide.slug }}>
                <LinkOverlay
                  display="block"
                  textAlign="center"
                  color="white"
                  fontSize="sm"
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  padding={2}
                  width="full"
                  background="main.500"
                  borderRadius="md"
                  lineHeight="21px"
                >
                  Lihat Profil
                </LinkOverlay>
              </Navigate>
            </Box>
          </LinkBox>
        )}
      />
    </Box>
  );
}

export function ClinicTelemedicineSkeletonDesktop() {
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="flex-end" mb={7}>
        <SkeletonText w="570px" />
        <Skeleton w="150px" h={5} />
      </Flex>
      <HStack spacing={5}>
        {Array.from(Array(4).keys()).map((id) => (
          <Box key={id} w="275px">
            <Flex justifyContent="space-between" w="full" mb={3}>
              <SkeletonText flex="1" />
              <Skeleton w={14} h={14} borderRadius="full" />
            </Flex>
            <SkeletonText mb={4} />
            <Skeleton w="full" h={8} />
          </Box>
        ))}
      </HStack>
    </Box>
  );
}
