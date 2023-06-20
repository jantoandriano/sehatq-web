import React from "react";
import {
  Box,
  DoctorExperienceIcon,
  HStack,
  Skeleton,
  SkeletonCircle,
  StarRating,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";

export type ConsultationHCPInfoMobileProps = {
  doctorName: string;
  doctorSlug: string;
  doctorImageUrl: string;
  speciality: string;
  experience: string;
  ratingAvg?: number;
  totalReview?: number;
  consultationFee: string;
  consultationStrikeFee?: string;
  hcfName: string;
};

export function ConsultationHCPInfoMobile(
  props: ConsultationHCPInfoMobileProps
) {
  const Image = useImage();
  return (
    <VStack width="full" spacing={6} align="start">
      <Text
        color="charcoalGrey"
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="md"
      >
        Detail Dokter
      </Text>
      <VStack
        align="start"
        justify="space-between"
        background="white"
        borderRadius="lg"
        boxShadow="base"
        width="full"
        p={6}
        spacing={3}
      >
        <HStack>
          <Image
            alt={props.doctorName}
            src={props.doctorImageUrl}
            priority={true}
            layout="fill"
            objectFit="cover"
            wrapperProps={{
              boxSize: "63px",
              position: "relative",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Box>
            <Text
              color="charcoalGrey"
              fontSize="15px"
              fontWeight="semibold"
              fontFamily="poppins"
            >
              {props.doctorName}
            </Text>
            <Text color="sea.500" fontSize="xs">
              {props.speciality}
            </Text>
            <Text color="charcoalGrey" fontSize="xs" fontWeight="semibold">
              {props.hcfName}
            </Text>
          </Box>
        </HStack>
        {props.ratingAvg && (
          <HStack width="full" spacing={6}>
            <StarRating
              fontSize="xs"
              rating={props.ratingAvg}
              ratingTotal={props.totalReview}
              iconWidth="14px"
              iconHeight="14px"
              useSingleStar
            />
            <HStack>
              <DoctorExperienceIcon />
              <Text
                color="charcoalGrey"
                fontSize="xs"
                fontWeight="semibold"
                fontFamily="poppins"
              >
                {props.experience}
              </Text>
            </HStack>
          </HStack>
        )}
      </VStack>
    </VStack>
  );
}

export function ConsultationHCPInfoMobileSkeleton() {
  return (
    <VStack width="full" spacing={6} align="start">
      <Skeleton width="105px" height="24px" />
      <VStack
        align="start"
        justify="space-between"
        background="white"
        borderRadius="base"
        boxShadow="base"
        width="full"
        p={6}
        spacing={3}
      >
        <HStack width="full">
          <SkeletonCircle boxSize="63px" />
          <Box width="70%">
            <Skeleton width="full" height="23px" />
            <Skeleton width="65px" height="16px" my={1} />
            <Skeleton width="160px" height="16px" />
          </Box>
        </HStack>
        <HStack width="full" spacing={6}>
          <Skeleton width="87px" height="16px" />
          <Skeleton width="77px" height="16px" />
        </HStack>
      </VStack>
    </VStack>
  );
}
