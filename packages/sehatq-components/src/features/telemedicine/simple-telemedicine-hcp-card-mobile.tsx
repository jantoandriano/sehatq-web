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

export type SimpleTelemedicineHCPCardMobileProps = {
  doctorId: number;
  doctorSlug: string;
  doctorName: string;
  photoUrl: string;
  speciality: string;
  consultationFee: string;
  ratingAvg: number;
  ratingTotal: number | null;
  experience: string;
  indicator: string;
  indicatorColor: string;
  isMultiplePrice?: boolean;
  isHideButton?: boolean;
};

export function SimpleTelemedicineHCPCardMobile(
  props: SimpleTelemedicineHCPCardMobileProps
) {
  const { isHideButton = false } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Flex
      direction="column"
      justify="space-between"
      p={3}
      width="144px"
      height="100%"
      background="white"
      borderRadius="lg"
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1);"
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
                my={1}
                color="charcoalGrey"
                fontSize="xs"
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
            fontSize="xxs"
            fontFamily="openSans"
            noOfLines={2}
          >
            {props.speciality}
          </Text>
          <Flex mt={1} flexWrap="wrap">
            {props.ratingAvg > 0 ? (
              <HStack spacing={0.5} mr={2} mb={0.5}>
                <StarRating
                  rating={
                    props.ratingAvg ? Math.round(props.ratingAvg * 10) / 10 : 0
                  }
                  useSingleStar
                  iconWidth="12px"
                  iconHeight="12px"
                  fontSize="xxs"
                />
                {props.ratingTotal && (
                  <Text
                    fontSize="xxs"
                    color="brownGrey.500"
                    whiteSpace="nowrap"
                  >
                    ({props.ratingTotal})
                  </Text>
                )}
              </HStack>
            ) : null}
            {props.experience.toLowerCase() !== "0 tahun" ? (
              <HStack spacing={0.5} mb={0.5}>
                <DoctorExperienceIcon boxSize="12px" />
                <Text
                  fontWeight="semibold"
                  fontSize="xxs"
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
      <Box mt={6}>
        {props.isMultiplePrice ? (
          <Text fontSize="xxs" color="brownGrey.500">
            Mulai dari
          </Text>
        ) : null}
        <Text
          color="sea.500"
          fontSize="sm"
          fontWeight="bold"
          fontFamily="openSans"
          mb={2}
        >
          {props.consultationFee}
        </Text>
        {!isHideButton ? (
          <StartConsultation
            {...props}
            isMobile
            buttonProps={{ fontSize: "xs", height: "30px", width: "full" }}
          />
        ) : null}
      </Box>
    </Flex>
  );
}

export function SimpleTelemedicineHCPCardMobileSkeleton() {
  return (
    <Flex
      direction="column"
      justify="space-between"
      p={3}
      background="white"
      borderRadius="xl"
      boxShadow="base"
      width="144px"
      height="100%"
    >
      <Flex direction="column" justify="space-between">
        <SkeletonCircle boxSize="56px" />
        <Skeleton width="120px" height="10px" mt={2} />
        <Skeleton width="110px" height="10px" mt={1} />
        <Skeleton width="50px" height="10px" mt={1} />
        <Flex direction="row" justify="space-between" mt={2}>
          <Skeleton width="45%" height="14px" />
          <Skeleton width="45%" height="14px" />
        </Flex>
      </Flex>
      <Box mt={6}>
        <Skeleton width="50px" height="10px" />
        <Skeleton width="88px" height="14px" mt={1} mb={3} />
        <Skeleton width="full" height="30px" />
      </Box>
    </Flex>
  );
}
