import React from "react";
import parse from "html-react-parser";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  ArrowBackIcon,
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
import { SocialShareButton } from "../general";
import { HealthCareFacilityDetailCardGeneralProps } from "./health-care-facility-detail-card-desktop";

export type HealthCareFacilityDetailCardMobileProps =
  HealthCareFacilityDetailCardGeneralProps & { shareUrl: string };

export function HealthCareFacilityDetailCardMobile(
  props: HealthCareFacilityDetailCardMobileProps
) {
  const Image = useImage();
  const { goBack } = useNavigation();
  const ASSETS = useAssets(["BPJS_LOGO"]);

  return (
    <VStack width="full">
      <Image
        priority
        src={props.imageUrl}
        alt={props.hcfName}
        layout="fill"
        objectFit="cover"
        sizes="460px"
        wrapperProps={{
          width: "100%",
          height: "200px",
          position: "relative",
          overflow: "hidden",
        }}
      />
      <Box
        margin="0px !important"
        width="full"
        position="absolute"
        background="rgba(0, 0, 0, 0.5)"
        height="200px"
      >
        <Flex direction="column" justify="space-between" p={4}>
          <HStack justify="space-between">
            <ArrowBackIcon color="white" boxSize="23.33px" onClick={goBack} />
            <SocialShareButton
              shareUrl={props.shareUrl}
              isMobile={true}
              sizeButton="18px"
              colorButton="white"
            />
          </HStack>
          <VStack
            spacing={0.5}
            align="start"
            width="full"
            position="absolute"
            bottom={4}
            left={0}
            px={4}
          >
            <HStack spacing={1}>
              {props.isPartner ? (
                <HStack
                  background="paleBlue.500"
                  borderRadius="full"
                  p={1}
                  pr={2}
                  spacing={1}
                >
                  <OfficialStoreIcon boxSize="16px" />
                  <Text color="sea.500" fontWeight="semibold" fontSize="xxs">
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
                    width={14}
                    height={14}
                    priority
                  />
                  <Text color="charcoalGrey" fontWeight="bold" fontSize="xxs">
                    BPJS
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
            <Text
              color="white"
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="lg"
              noOfLines={2}
            >
              {props.hcfName}
            </Text>
            <Text color="main.500" fontWeight="semibold" fontSize="xs">
              {props.hcfType}{" "}
              {props.hcfClass ? `(Tipe ${props.hcfClass})` : null}
            </Text>
            {props.rating ? (
              <HStack>
                <StarRating
                  useSingleStar
                  rating={props.rating}
                  iconWidth="14px"
                  iconHeight="14px"
                  fontSize="xs"
                  colorRatingLabel="white"
                />
                <Text fontSize="xs" color="white">
                  (Google Review)
                </Text>
              </HStack>
            ) : null}
          </VStack>
        </Flex>
      </Box>
      <VStack width="full" p={4} spacing={4}>
        {props.openTime ? (
          <Box background="iceBlue.500" borderRadius="base" p={4} width="full">
            <Text
              color="charcoalGrey"
              fontSize="md"
              fontWeight="semibold"
              fontFamily="poppins"
            >
              Jam Operasional
            </Text>
            <Text mt={2} color="charcoalGrey" fontSize="sm">
              {parse(props.openTime)}
            </Text>
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
              <Text color="sea.500" fontSize="xs">
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
    </VStack>
  );
}

export function HealthCareFacilityDetailCardMobileSkeleton() {
  return (
    <VStack width="full">
      <Box width="full" height="200px">
        <Flex
          direction="column"
          background="rgba(0, 0, 0, 0.5)"
          justify="space-between"
          p={4}
          height="full"
        >
          <ArrowBackIcon color="white" boxSize="23.33px" />
          <VStack spacing={1.5} mt={8} align="start" width="full">
            <HStack>
              <Skeleton width="70px" height="22px" borderRadius="full" />
              <Skeleton width="70px" height="22px" borderRadius="full" />
              <Skeleton width="70px" height="22px" borderRadius="full" />
            </HStack>
            <Skeleton width="200px" height="18px" />
            <Skeleton width="159px" height="18px" />
            <Skeleton width="169px" height="18px" />
          </VStack>
        </Flex>
      </Box>
      <VStack p={4} spacing={4} width="full">
        <Box background="iceBlue.500" borderRadius="base" p={4} width="full">
          <Skeleton width="140px" height="22px" />
          <Skeleton width="174px" height="18px" mt={2} />
          <Skeleton width="174px" height="18px" mt={2} />
        </Box>
        <Box width="full">
          <Skeleton width="141px" height="22px" />
          <Skeleton width="full" height="18px" mt={2} />
          <Skeleton width="300px" height="18px" mt={2} />
        </Box>
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
    </VStack>
  );
}
