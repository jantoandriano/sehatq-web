import React from "react";
import {
  Box,
  DoctorExperienceIcon,
  Flex,
  HStack,
  LinkBox,
  Skeleton,
  SkeletonCircle,
  StarRating,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";
import { StartConsultation } from "../general";

export type TelemedicineLandingHCPCardDesktopProps = {
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
  ratingAvg: number;
  ratingTotal: number | null;
};

export function TelemedicineLandingHCPCardDesktop(
  props: TelemedicineLandingHCPCardDesktopProps
) {
  const Image = useImage();
  return (
    <LinkBox width="full" height="190px">
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        width="full"
        height="190px"
      >
        <Flex justify="space-between" direction="column" height="full">
          <Flex justify="space-between" direction="column">
            <Text
              noOfLines={2}
              color="charcoalGrey"
              fontSize="lg"
              fontWeight="semibold"
            >
              {props.doctorName}
            </Text>
            <Text fontSize="xs" color="sea.500" fontFamily="openSans">
              {props.speciality}
            </Text>
            <Text fontSize="xs" color="charcoalGrey" fontFamily="openSans">
              {props.hcfName}
            </Text>
            <HStack spacing={2} mt={1}>
              <HStack spacing={0.5}>
                <StarRating
                  rating={props.ratingAvg ?? 0}
                  useSingleStar
                  iconWidth="12px"
                  iconHeight="12px"
                  fontSize="xxs"
                />
                {props.ratingTotal && (
                  <Text fontSize="xxs" color="brownGrey.500">
                    ( {props.ratingTotal})
                  </Text>
                )}
              </HStack>
              <HStack spacing={0.5}>
                <DoctorExperienceIcon boxSize="13px" />
                <Text ml="2px" fontSize="xxs" color="brownGrey.500">
                  {props.experience}
                </Text>
              </HStack>
            </HStack>
          </Flex>
          <HStack mb={2}>
            {props.consultationStrikeFee && (
              <Text
                color="brownGrey.500"
                fontSize="sm"
                fontFamily="openSans"
                textDecoration="line-through"
              >
                {props.consultationStrikeFee}
              </Text>
            )}
            <Text
              color="sea.500"
              fontSize="md"
              fontFamily="openSans"
              fontWeight="bold"
            >
              {props.consultationFee}
            </Text>
          </HStack>
        </Flex>
        <Flex
          direction="column"
          justify="space-between"
          height="full"
          align="center"
        >
          <Image
            alt={props.doctorSlug}
            src={props.photoUrl}
            layout="fill"
            objectFit="cover"
            sizes="80px"
            wrapperProps={{
              boxSize: "80px",
              position: "relative",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          {props.indicator == "green" && (
            <Box
              border="solid 2px"
              borderColor="white"
              borderRadius="full"
              background="indicator.green"
              boxSize="16px"
              marginTop="65px !important"
              marginLeft="50px !important"
              position="absolute"
            ></Box>
          )}
          <StartConsultation
            doctorId={props.doctorId}
            doctorSlug={props.doctorSlug}
            indicator={props.indicator}
          />
        </Flex>
      </Flex>
    </LinkBox>
  );
}

export function TelemedicineLandingHCPCardDesktopSkeleton() {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      width="full"
      height="190px"
    >
      <Flex justify="space-between" direction="column">
        <Skeleton width="200px" height="20px" />
        <Skeleton width="145px" height="20px" mt={1} />
        <Skeleton width="100px" height={3} mt={1} />
        <Skeleton width="80px" height={3} mt={1} />
        <HStack mt={1}>
          <Skeleton width="50px" height={3} />
          <Skeleton width="50px" height={3} />
        </HStack>
        <Skeleton mt={6} width="81px" height="20px" />
      </Flex>
      <VStack justify="space-between" height="full">
        <SkeletonCircle boxSize="80px" />
        <Skeleton width="120px" height="40px" borderRadius="base" />
      </VStack>
    </Flex>
  );
}
