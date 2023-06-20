import React from "react";

import { useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
  LinkOverlay,
  LinkBox,
  HStack,
} from "../../user-interfaces";

type ClinicBookingMobileProps = {
  title: string;
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

export function ClinicBookingMobile(props: ClinicBookingMobileProps) {
  const { title, hcpList } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box>
      <Text fontWeight="bold" fontFamily="poppins" mb={3} px={4}>
        {title}
      </Text>
      <HStack spacing={3} overflowX="auto" px={4} py={2} align="stretch">
        {hcpList.map((item) => (
          <LinkBox
            key={item.id}
            minW="150px"
            w="150px"
            bgColor="white"
            boxShadow="base"
            borderRadius="xl"
            px={3}
            py={4}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box mb={4}>
              <Box mb={3}>
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
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
              <Text
                fontSize="xs"
                fontFamily="poppins"
                fontWeight="semibold"
                noOfLines={2}
                mb={1}
              >
                {item.name}
              </Text>
              <Text fontSize="xxs" fontFamily="poppins" mb={3} color="sea.500">
                {item.specialityHcp.name}
              </Text>
              <Text fontSize="xxs" mb={1} fontWeight="semibold">
                {item.hcfName}
              </Text>
              <Text color="brownGrey.500" fontSize="xxs">
                {item.district}, {item.city}
              </Text>
            </Box>
            <Navigate
              name="HEALTH_CARE_PROFESIONAL"
              query={{ slugs: [item.slug] }}
            >
              <LinkOverlay
                h="32px"
                w="129px"
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
        ))}
      </HStack>
    </Box>
  );
}

export function ClinicBookingSkeletonMobile() {
  return (
    <>
      <SkeletonText mb={8} />
      <HStack alignItems="flex-start" spacing={3}>
        <Box w="150px">
          <Skeleton w={14} h={14} mb={3} borderRadius="full" />
          <SkeletonText mb={3} />
          <SkeletonText mb={5} />
          <Skeleton w="full" borderRadius="base" h={8} />
        </Box>
        <Box w="150px">
          <Skeleton w={14} h={14} mb={3} borderRadius="full" />
          <SkeletonText mb={3} />
          <SkeletonText mb={5} />
          <Skeleton w="full" borderRadius="base" h={8} />
        </Box>
      </HStack>
    </>
  );
}
