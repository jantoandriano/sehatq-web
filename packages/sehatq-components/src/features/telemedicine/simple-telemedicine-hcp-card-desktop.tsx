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
  useImage,
} from "../../user-interfaces";
import { StartConsultation } from "../general";

export type SimpleTelemedicineHCPCardDesktopProps = {
  doctorId: number;
  doctorSlug: string;
  doctorName: string;
  photoUrl: string;
  speciality: string;
  consultationFee: string;
  isMultiplePrice?: boolean;
  ratingAvg: number;
  ratingTotal: number | null;
  experience: string;
  indicator: string;
  indicatorColor: string;
  isPrivateChannel?: boolean;
  isBookingChannel?: boolean;
  isHideButton?: boolean;
};

export function SimpleTelemedicineHCPCardDesktop(
  props: SimpleTelemedicineHCPCardDesktopProps
) {
  const { isHideButton } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Flex
      direction="column"
      justify="space-between"
      p={3}
      background="white"
      borderRadius="xl"
      boxShadow="base"
      height="100%"
    >
      <LinkBox>
        <Flex direction="column" justify="space-between">
          <Image
            alt="regular-banner"
            src={props.photoUrl}
            layout="fill"
            objectFit="cover"
            wrapperProps={{
              boxSize: "56px",
              position: "relative",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Box
            border="solid 2px"
            borderColor="white"
            borderRadius="full"
            background={props.indicatorColor}
            boxSize="16px"
            marginTop="44px"
            marginLeft="33px"
            position="absolute"
          ></Box>
          <Navigate
            name="TELEMED_HCP_PROFILE"
            query={{ slug: props.doctorSlug }}
          >
            <LinkOverlay>
              <Text
                mt={3}
                mb={1}
                color="charcoalGrey"
                fontSize="sm"
                fontWeight="semibold"
                fontFamily="poppins"
                noOfLines={2}
              >
                {props.doctorName}
              </Text>
            </LinkOverlay>
          </Navigate>
          <Text
            color="sea.500"
            fontSize="xs"
            fontFamily="openSans"
            noOfLines={2}
          >
            {props.speciality}
          </Text>
          <Flex mt={1} flexWrap="wrap">
            {props.ratingAvg > 0 ? (
              <HStack spacing={1} mr={3} mb={1}>
                <StarRating
                  rating={
                    props.ratingAvg ? Math.round(props.ratingAvg * 10) / 10 : 0
                  }
                  useSingleStar
                  iconWidth="16px"
                  iconHeight="16px"
                  fontSize="xs"
                />
                {props.ratingTotal && (
                  <Text fontSize="xs" color="brownGrey.500" whiteSpace="nowrap">
                    ({props.ratingTotal})
                  </Text>
                )}
              </HStack>
            ) : null}
            {props.experience.toLowerCase() !== "0 tahun" ? (
              <HStack spacing={1} mb={1}>
                <DoctorExperienceIcon boxSize="16px" />
                <Text
                  ml="2px"
                  fontWeight="semibold"
                  fontSize="xs"
                  color="brownGrey.500"
                  whiteSpace="nowrap"
                >
                  {props.experience}
                </Text>
              </HStack>
            ) : null}
          </Flex>
        </Flex>
      </LinkBox>
      <Box mt={4}>
        {props.isMultiplePrice ? (
          <Text fontSize="xs" color="brownGrey.500">
            Mulai dari
          </Text>
        ) : null}
        <Text
          color="sea.500"
          fontWeight="bold"
          fontFamily="openSans"
          marginBottom={2}
        >
          {props.consultationFee}
        </Text>
        {!isHideButton ? (
          <StartConsultation
            {...props}
            buttonProps={{ fontSize: "xs", height: "30px", width: "full" }}
          />
        ) : null}
      </Box>
    </Flex>
  );
}

export function SimpleTelemedicineHCPCardDesktopSkeleton() {
  return (
    <Flex
      direction="column"
      justify="space-between"
      p={3}
      background="white"
      borderRadius="xl"
      boxShadow="base"
      height="100%"
    >
      <Flex direction="column" justify="space-between">
        <SkeletonCircle boxSize="56px" />
        <Skeleton width="full" height="10px" mt={3} />
        <Skeleton width="90%" height="10px" mt={1} />
        <Skeleton width="50%" height="10px" mt={1} />
        <Flex direction="row" justify="space-between" mt={1}>
          <Skeleton width="45%" height="14px" mt={2} />
          <Skeleton width="45%" height="14px" mt={2} />
        </Flex>
      </Flex>
      <Box mt={6}>
        <Skeleton width="40%" height="10px" mb={2} />
        <Skeleton width="60%" height="14px" mb={2} />
        <Skeleton width="full" height="30px" />
      </Box>
    </Flex>
  );
}
