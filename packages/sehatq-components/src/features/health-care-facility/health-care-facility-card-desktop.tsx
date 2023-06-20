import { useNavigation } from "@sehatq/utils";
import React from "react";
import parse from "html-react-parser";
import {
  Box,
  Center,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  OfficialStoreIcon,
  SimpleLocationIcon,
  Skeleton,
  StarRating,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";

export type HealthCareFacilityCardGeneralProps = {
  imageUrl: string;
  hcfSlug: string;
  hcfName: string;
  hcfType: string;
  hcfClass: string;
  isPartner: boolean;
  isEmergency: boolean;
  distance?: number | null;
  openTime: string;
  district: string;
  city: string;
  rating: number;
};

export type HealthCareFacilityCardDesktopProps =
  HealthCareFacilityCardGeneralProps;

export function HealthCareFacilityCardDesktop(
  props: HealthCareFacilityCardDesktopProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <LinkBox>
      <Flex
        direction="row"
        borderRadius="xl"
        boxShadow="base"
        background="white"
        p={4}
        height="full"
      >
        <Box>
          <Image
            src={props.imageUrl}
            alt={props.hcfSlug}
            layout="fill"
            objectFit="cover"
            sizes="72px"
            wrapperProps={{
              cursor: "pointer",
              boxSize: "72px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "base",
            }}
          />
          {props.rating ? (
            <Box
              position="absolute"
              marginTop="-19px !important"
              width="72px"
              p={2}
            >
              <Center
                background="white"
                borderRadius="full"
                py={0.5}
                boxShadow="base"
              >
                <StarRating
                  useSingleStar
                  rating={props.rating}
                  iconWidth="14px"
                  iconHeight="14px"
                  fontSize="xs"
                />
              </Center>
            </Box>
          ) : null}
        </Box>
        <VStack spacing={1.5} align="start" ml={3} width="88%">
          <Navigate
            name="HEALTH_CARE_FACILITY"
            query={{ hcfSlug: props.hcfSlug }}
          >
            <LinkOverlay
              color="charcoalGrey"
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="md"
              noOfLines={2}
            >
              {props.hcfName}
            </LinkOverlay>
          </Navigate>
          <Text color="sea.500" fontWeight="semibold" fontSize="xs">
            {props.hcfType} {props.hcfClass ? `(Tipe ${props.hcfClass})` : null}
          </Text>
          <HStack>
            {props.isPartner ? (
              <HStack
                background="paleBlue.500"
                borderRadius="full"
                p={1}
                pr={2}
              >
                <OfficialStoreIcon boxSize="16px" />
                <Text color="sea.500" fontWeight="semibold" fontSize="xxs">
                  Partner
                </Text>
              </HStack>
            ) : null}
            {props.isEmergency ? (
              <HStack background="#FBEBEB" borderRadius="full" py={1} px={2}>
                <Text color="#D63B3B" fontWeight="bold" fontSize="xxs">
                  IGD 24 Jam
                </Text>
              </HStack>
            ) : null}
          </HStack>
          <HStack>
            <HStack spacing={0.5}>
              <SimpleLocationIcon />
              {props.distance ? (
                <Text color="sea.500" fontWeight="semibold" fontSize="xs">
                  {props.distance}km
                </Text>
              ) : null}
            </HStack>
            <Text color="brownGrey.500" fontSize="xs">
              {props.district}, {props.city}
            </Text>
          </HStack>
          {props.openTime ? (
            <Text
              background="iceBlue.500"
              borderRadius="base"
              color="charcoalGrey"
              fontSize="xs"
              fontWeight="semibold"
              p={2}
              textAlign="center"
              width="full"
            >
              {parse(props.openTime)}
            </Text>
          ) : null}
        </VStack>
      </Flex>
    </LinkBox>
  );
}

export function HealthCareFacilityCardDesktopSkeleton() {
  return (
    <Flex
      direction="row"
      borderRadius="xl"
      boxShadow="base"
      background="white"
      p={4}
    >
      <Skeleton width="72px" height="72px" borderRadius="base" />
      <VStack spacing={1.5} align="start" ml={3} width="88%">
        <Skeleton width="261px" height="20px" />
        <Skeleton width="119px" height="16px" />
        <HStack>
          <Skeleton width="70px" height="22px" borderRadius="full" />
          <Skeleton width="74px" height="22px" borderRadius="full" />
        </HStack>
        <Skeleton width="261px" height="16px" />
        <Skeleton width="full" height="34px" borderRadius="base" />
      </VStack>
    </Flex>
  );
}
