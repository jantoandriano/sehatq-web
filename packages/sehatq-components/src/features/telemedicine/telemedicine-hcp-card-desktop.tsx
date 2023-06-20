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

export type TelemedicineHCPCardGeneralProps = {
  doctorId: number;
  doctorName: string;
  doctorSlug: string;
  speciality: string;
  hcfName: string;
  photoUrl: string;
  experience: string;
  indicator: string;
  consultationFee: string;
  consultationStrikeFee: string | undefined;
  ratingAvg?: number;
  totalReview?: number;
  isRecomended?: boolean;
  isPrivateChannel?: boolean;
  isBookingChannel?: boolean;
};

export type TelemedicineHCPCardDesktopProps = TelemedicineHCPCardGeneralProps;

export function TelemedicineHCPCardDesktop(
  props: TelemedicineHCPCardDesktopProps
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
            <Text color="white" fontSize="sm" fontWeight="semibold">
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
                fontSize="lg"
                fontWeight="semibold"
                fontFamily="poppins"
                noOfLines={2}
              >
                {props.doctorName}
              </LinkOverlay>
            </Navigate>
            <Text color="sea.500" fontSize="sm">
              {props.speciality}
            </Text>
            <Text color="charcoalGrey" fontSize="sm" fontWeight="semibold">
              {props.hcfName}
            </Text>
            <HStack width="full" spacing={6} pt={2}>
              {props.ratingAvg && (
                <StarRating
                  fontSize="sm"
                  rating={props.ratingAvg}
                  ratingTotal={props.totalReview}
                  iconWidth="14px"
                  iconHeight="14px"
                  useSingleStar
                />
              )}
              <HStack>
                <DoctorExperienceIcon />
                <Text color="brownGrey.500" fontSize="sm" fontWeight="semibold">
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
        <StartConsultation {...props} />
      </Flex>
    </Flex>
  );
}

export function TelemedicineHCPCardDesktopSkeleton() {
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
        <VStack width="90%" alignItems="normal" spacing={1}>
          <Skeleton width="40%" height="28px" />
          <Skeleton width="86px" height="22px" />
          <Skeleton width="60px" height="22px" />
          <HStack width="full" spacing={6} pt={2}>
            <Skeleton width="60px" height="22px" />
            <Skeleton width="65px" height="22px" />
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
