import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  DoctorExperienceIcon,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonCircle,
  StarRating,
  Text,
  ThumbsUpIcon,
  useImage,
  VStack,
} from "../../user-interfaces";
import { StartConsultation } from "../general";
import { TelemedicineHCPCardGeneralProps } from "./telemedicine-hcp-card-desktop";

export type TelemedicineHCPCardMobileProps = TelemedicineHCPCardGeneralProps;

export function TelemedicineHCPCardMobile(
  props: TelemedicineHCPCardMobileProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Flex
      direction="column"
      justify="space-between"
      background="white"
      borderRadius="lg"
      boxShadow="base"
    >
      <LinkBox>
        {props.isRecomended && (
          <HStack
            background="azure.500"
            py={0.5}
            px={2}
            width="fit-content"
            borderTopLeftRadius="lg"
            borderBottomRightRadius="lg"
            spacing={1}
          >
            <ThumbsUpIcon />
            <Text color="white" fontSize="xs" fontWeight="semibold">
              Dokter Pilihan
            </Text>
          </HStack>
        )}
        <HStack
          p={4}
          pt={props.isRecomended ? 3 : 4}
          spacing={3}
          alignItems="flex-start"
        >
          <Image
            alt={props.doctorSlug}
            src={props.photoUrl}
            layout="fill"
            objectFit="cover"
            sizes="63px"
            wrapperProps={{
              boxSize: "63px",
              position: "relative",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Box
            border="solid 2px"
            borderColor="white"
            borderRadius="full"
            background={
              props.indicator == "green" ? "indicator.green" : "indicator.grey"
            }
            boxSize="16px"
            marginTop="45px !important"
            marginLeft="45px !important"
            position="absolute"
          />
          <VStack alignItems="normal" spacing={0.5} width="80%">
            <Navigate name="TELEMED_DOCTOR" query={{ slug: props.doctorSlug }}>
              <LinkOverlay
                color="charcoalGrey"
                fontSize="15px"
                fontWeight="semibold"
                fontFamily="poppins"
                noOfLines={2}
              >
                {props.doctorName}
              </LinkOverlay>
            </Navigate>
            <Text color="sea.500" fontSize="xs">
              {props.speciality}
            </Text>
            <Text color="charcoalGrey" fontSize="xs" fontWeight="semibold">
              {props.hcfName}
            </Text>
            <HStack width="full" spacing={6} pt={2}>
              {props.ratingAvg && (
                <StarRating
                  fontSize="xs"
                  rating={props.ratingAvg}
                  ratingTotal={props.totalReview}
                  iconWidth="16px"
                  iconHeight="16px"
                  useSingleStar
                />
              )}
              <HStack>
                <DoctorExperienceIcon />
                <Text color="brownGrey.500" fontSize="xs" fontWeight="semibold">
                  {props.experience}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </LinkBox>
      <Flex
        direction="row"
        background="iceBlue.500"
        px={4}
        py={3}
        justify="space-between"
        borderBottomRadius="lg"
      >
        <HStack width="55%" whiteSpace="nowrap">
          <Text
            color="sea.500"
            fontSize="md"
            fontFamily="openSans"
            fontWeight="bold"
          >
            {props.consultationFee}
          </Text>
          {props.consultationStrikeFee && (
            <Text
              color="brownGrey.500"
              fontSize="xs"
              fontFamily="openSans"
              textDecoration="line-through"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {props.consultationStrikeFee}
            </Text>
          )}
        </HStack>
        <StartConsultation {...props} isMobile />
      </Flex>
    </Flex>
  );
}

export function TelemedicineHCPCardMobileSkeleton() {
  return (
    <Flex
      direction="column"
      justify="space-between"
      background="white"
      borderRadius="lg"
      boxShadow="base"
    >
      <HStack p={4} spacing={3} alignItems="flex-start">
        <SkeletonCircle boxSize="63px" />
        <VStack alignItems="normal" spacing={1}>
          <Skeleton width="208px" height="21px" />
          <Skeleton width="86px" height="16px" />
          <Skeleton width="60px" height="16px" />
          <HStack width="full" spacing={6} pt={2}>
            <Skeleton width="60px" height="16px" />
            <Skeleton width="65px" height="16px" />
          </HStack>
        </VStack>
      </HStack>
      <Flex
        direction="row"
        background="iceBlue.500"
        px={4}
        py={3}
        justify="space-between"
        borderBottomRadius="lg"
        alignItems="center"
      >
        <Skeleton width="100px" height="20px" />
        <Skeleton width="120px" height="40px" borderRadius="base" />
      </Flex>
    </Flex>
  );
}
