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
import { HealthCareFacilityCardGeneralProps } from "./health-care-facility-card-desktop";

export type HealthCareFacilityCardMobileProps =
  HealthCareFacilityCardGeneralProps;

export function HealthCareFacilityCardMobile(
  props: HealthCareFacilityCardMobileProps
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
      >
        <Box>
          <Image
            src={props.imageUrl}
            alt={props.hcfSlug}
            layout="fill"
            objectFit="cover"
            sizes="60px"
            wrapperProps={{
              cursor: "pointer",
              boxSize: "60px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "base",
            }}
          />
          {props.rating ? (
            <Box
              position="absolute"
              marginTop="-19px !important"
              width="60px"
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
        <VStack spacing={1} align="start" ml={3} width="75%">
          <Navigate
            name="HEALTH_CARE_FACILITY"
            query={{ hcfSlug: props.hcfSlug }}
          >
            <LinkOverlay
              color="charcoalGrey"
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="sm"
              noOfLines={2}
            >
              {props.hcfName}
            </LinkOverlay>
          </Navigate>
          <Text color="sea.500" fontWeight="semibold" fontSize="xxs">
            {props.hcfType} {props.hcfClass ? `(Tipe ${props.hcfClass})` : null}
          </Text>
          <HStack>
            {props.isPartner ? (
              <HStack
                background="paleBlue.500"
                spacing={0.5}
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
                <Text color="sea.500" fontWeight="semibold" fontSize="xxs">
                  {props.distance}km
                </Text>
              ) : null}
            </HStack>
            <Text color="brownGrey.500" fontSize="xxs">
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

export function HealthCareFacilityCardMobileSkeleton() {
  return (
    <Flex
      direction="row"
      borderRadius="xl"
      boxShadow="base"
      background="white"
      p={4}
    >
      <Skeleton width="60px" height="60px" borderRadius="base" />
      <VStack spacing={1.5} align="start" ml={3} width="75%">
        <Skeleton width="full" height="18px" />
        <Skeleton width="100px" height="14px" />
        <HStack>
          <Skeleton width="70px" height="22px" borderRadius="full" />
          <Skeleton width="74px" height="22px" borderRadius="full" />
        </HStack>
        <Skeleton width="full" height="14px" />
        <Skeleton width="full" height="34px" borderRadius="base" />
      </VStack>
    </Flex>
  );
}
