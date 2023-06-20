import React from "react";

import { useNavigation, NavigationValue } from "@sehatq/utils";
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
} from "../../user-interfaces";
import { ClinicCarousel } from "./clinic-carousel";

type ClinicBookingDesktopProps = {
  title: string;
  bookingsNavigation?: NavigationValue;
  hcpList: {
    id: number;
    imageUrl: string;
    imageAlt: string;
    name: string;
    specialityHcp: { name: string };
    hcfName: string;
    district: string;
    city: string;
    slug: string;
  }[];
};

export function ClinicBookingDesktop(props: ClinicBookingDesktopProps) {
  const { title, bookingsNavigation, hcpList } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Text fontSize="3xl" fontWeight="bold" fontFamily="poppins">
          {title}
        </Text>
        {bookingsNavigation && (
          <Navigate {...bookingsNavigation}>
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
        slides={hcpList}
        slideGap={4}
        slidesToShow={4}
        renderSlide={({ slide }) => (
          <LinkBox
            key={slide.id}
            flex="1"
            height="calc(100% - 8px)"
            w="255px"
            bgColor="white"
            boxShadow="base"
            borderRadius="xl"
            p={3}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            mt={1}
            mb={3}
          >
            <Box mb="16px">
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Text
                  fontSize="sm"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  noOfLines={2}
                >
                  {slide.name}
                </Text>
                <Box>
                  <Image
                    src={slide.imageUrl}
                    alt={slide.imageAlt}
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
              <Text fontSize="xs" fontFamily="poppins" mb={3} color="sea.500">
                {slide.specialityHcp.name}
              </Text>
              <Text fontSize="xs" mb={1} fontWeight="semibold">
                {slide.hcfName}
              </Text>
              <Text color="brownGrey.500" fontSize="xs">
                {slide.district}, {slide.city}
              </Text>
            </Box>
            <Navigate
              name="HEALTH_CARE_PROFESIONAL"
              query={{ slugs: [slide.slug] }}
            >
              <LinkOverlay
                h={8}
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="xs"
                bgColor="main.500"
                borderRadius="base"
                color="white"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                Booking
              </LinkOverlay>
            </Navigate>
          </LinkBox>
        )}
      />
    </Box>
  );
}

export function ClinicBookingSkeletonDesktop() {
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
