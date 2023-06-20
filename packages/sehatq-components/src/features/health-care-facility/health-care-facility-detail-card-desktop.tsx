import React from "react";
import parse from "html-react-parser";
import { useAssets } from "@sehatq/utils";
import {
  Box,
  Button,
  Flex,
  HStack,
  OfficialStoreIcon,
  SimpleLocationIcon,
  Skeleton,
  StarRating,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";

export type HealthCareFacilityDetailCardGeneralProps = {
  imageUrl: string;
  hcfName: string;
  hcfType: string;
  hcfClass: string;
  isPartner: boolean;
  isEmergency: boolean;
  isAllowBPJS: boolean;
  distance?: number | null;
  openTime: string;
  district: string;
  city: string;
  rating: number;
  address: string;
  mapsUrl: string;
};

export type HealthCareFacilityDetailCardDesktopProps =
  HealthCareFacilityDetailCardGeneralProps;

export function HealthCareFacilityDetailCardDesktop(
  props: HealthCareFacilityDetailCardDesktopProps
) {
  const Image = useImage();
  const ASSETS = useAssets(["BPJS_LOGO"]);
  return (
    <VStack width="full" align="start" spacing="8">
      <Flex direction="row" height="full" width="full">
        <Box>
          <Image
            priority
            src={props.imageUrl}
            alt={props.hcfName}
            layout="fill"
            objectFit="cover"
            sizes="280px"
            wrapperProps={{
              width: "280px",
              paddingBottom: "78.58%",
              position: "relative",
              overflow: "hidden",
              borderRadius: "xl",
            }}
          />
        </Box>
        <VStack spacing={2} align="start" ml={6} width="88%">
          <HStack>
            {props.isPartner ? (
              <HStack
                background="paleBlue.500"
                borderRadius="full"
                p={1}
                pr={2}
                spacing={1}
              >
                <OfficialStoreIcon boxSize="16px" />
                <Text color="sea.500" fontWeight="semibold" fontSize="xs">
                  Partner
                </Text>
              </HStack>
            ) : null}
            {props.isAllowBPJS ? (
              <HStack
                background="#F1F1F1"
                borderRadius="full"
                p={1}
                pr={2}
                spacing={1}
              >
                <Image
                  src={ASSETS.BPJS_LOGO}
                  alt="bpjs-logo"
                  layout="fixed"
                  width={18}
                  height={18}
                  priority
                />
                <Text color="charcoalGrey" fontWeight="bold" fontSize="xs">
                  BPJS
                </Text>
              </HStack>
            ) : null}
            {props.isEmergency ? (
              <HStack background="#FBEBEB" borderRadius="full" py={1} px={2}>
                <Text color="#D63B3B" fontWeight="bold" fontSize="xs">
                  IGD 24 Jam
                </Text>
              </HStack>
            ) : null}
          </HStack>
          <Text
            color="charcoalGrey"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="5xl"
            noOfLines={2}
          >
            {props.hcfName}
          </Text>
          <Text color="sea.500" fontWeight="semibold" fontSize="md">
            {props.hcfType} {props.hcfClass ? `(Tipe ${props.hcfClass})` : null}
          </Text>
          <Text color="brownGrey.500" fontSize="md">
            {props.district}, {props.city}
          </Text>
          {props.rating ? (
            <HStack>
              <StarRating
                useSingleStar
                rating={props.rating}
                iconWidth="17.5px"
                iconHeight="17.5px"
                fontSize="sm"
                colorRatingLabel="charcoalGrey"
              />
              <Text fontSize="sm" color="charcoalGrey">
                (Google Review)
              </Text>
            </HStack>
          ) : null}
          {props.distance ? (
            <HStack
              background="iceBlue.500"
              borderRadius="base"
              p={2}
              spacing={0.5}
              width="full"
              justify="space-between"
            >
              <HStack spacing={0.5}>
                <SimpleLocationIcon />
                <Text color="sea.500" fontWeight="semibold" fontSize="xs">
                  {props.distance}km dari lokasi anda
                </Text>
              </HStack>
              <Button
                as="a"
                target="_blank"
                variant="outline"
                background="white"
                height="24px"
                borderRadius="base"
                fontSize="xs"
                fontWeight="semibold"
                color="sea.500"
                borderColor="main.500"
                href={props.mapsUrl}
              >
                Lihat Lokasi
              </Button>
            </HStack>
          ) : null}
        </VStack>
      </Flex>
      {props.openTime ? (
        <Box width="full">
          <Text
            fontSize="md"
            color="charcoalGrey"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Jam Operasional
          </Text>
          <HStack mt={2} spacing={6}>
            {props.openTime.split("<br/>").map((sched) => (
              <Text key={sched} fontSize="sm" color="charcoalGrey">
                {parse(sched)}
              </Text>
            ))}
          </HStack>
        </Box>
      ) : null}
      <Box width="full">
        <Text
          fontSize="md"
          color="charcoalGrey"
          fontWeight="semibold"
          fontFamily="poppins"
        >
          Alamat
        </Text>
        <Text mt={2} fontSize="sm" color="charcoalGrey">
          {props.address}
        </Text>
      </Box>
    </VStack>
  );
}

export function HealthCareFacilityDetailCardDesktopSkeleton() {
  return (
    <VStack width="full" align="start" spacing="8">
      <Flex direction="row" height="full" width="full">
        <Box>
          <Skeleton width="280px" height="220px" borderRadius="xl" />
        </Box>
        <VStack spacing={2.5} align="start" ml={6} width="88%">
          <HStack>
            <Skeleton width="79px" height="24px" borderRadius="full" />
            <Skeleton width="79px" height="24px" borderRadius="full" />
            <Skeleton width="79px" height="24px" borderRadius="full" />
          </HStack>
          <Skeleton width="392px" height="42px" />
          <Skeleton width="159px" height="22px" />
          <Skeleton width="245px" height="22px" />
          <Skeleton width="200px" height="19px" />
          <HStack
            background="iceBlue.500"
            borderRadius="base"
            p={2}
            spacing={0.5}
            width="full"
            justify="space-between"
          >
            <Skeleton width="126px" height="16px" />
            <Skeleton width="87px" height="24px" borderRadius="base" />
          </HStack>
        </VStack>
      </Flex>
      <Box>
        <Skeleton width="141px" height="24px" />
        <HStack spacing={6} mt={2}>
          <Skeleton width="174px" height="20px" />
          <Skeleton width="174px" height="20px" />
          <Skeleton width="174px" height="20px" />
        </HStack>
      </Box>
      <Box width="full">
        <Skeleton width="141px" height="24px" />
        <Skeleton width="full" height="20px" mt={2} />
        <Skeleton width="300px" height="20px" mt={2} />
      </Box>
    </VStack>
  );
}
