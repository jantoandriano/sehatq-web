import React from "react";
import {
  Box,
  Divider,
  DoctorExperienceIcon,
  HStack,
  Skeleton,
  SkeletonCircle,
  StarRating,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";

export type ConsultationHCPInfoDesktopProps = {
  doctorName: string;
  doctorSlug: string;
  doctorImageUrl: string;
  speciality: string;
  experience: string;
  ratingAvg?: number;
  totalReview?: number;
  consultationFee: string;
  consultationStrikeFee?: string;
};

export function ConsultationHCPInfoDesktop(
  props: ConsultationHCPInfoDesktopProps
) {
  const Image = useImage();
  return (
    <VStack
      align="start"
      justify="space-between"
      background="white"
      borderRadius="lg"
      boxShadow="base"
      width="300px"
      p={6}
      spacing={3}
    >
      <Text
        color="charcoalGrey"
        fontSize="md"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Informasi Dokter
      </Text>
      <HStack>
        <Image
          alt={props.doctorName}
          src={props.doctorImageUrl}
          priority={true}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            boxSize: "60px",
            position: "relative",
            borderRadius: "full",
            overflow: "hidden",
          }}
        />
        <Box>
          <Text
            color="charcoalGrey"
            fontSize="sm"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            {props.doctorName}
          </Text>
          <Text color="brownGrey.500" fontSize="xs">
            {props.speciality}
          </Text>
        </Box>
      </HStack>
      {props.ratingAvg && (
        <HStack
          width="full"
          background="white"
          p={3}
          divider={
            <Divider
              height="33px"
              orientation="vertical"
              borderColor="veryLightPink"
              border="solid 0.5px"
            />
          }
          borderRadius="base"
          boxShadow="xs"
          justify="flex-start"
        >
          <Box>
            <Text color="brownGrey.500" fontSize="xs">
              Pengalaman
            </Text>
            <HStack>
              <DoctorExperienceIcon />
              <Text
                color="charcoalGrey"
                fontSize="sm"
                fontWeight="semibold"
                fontFamily="poppins"
              >
                {props.experience}
              </Text>
            </HStack>
          </Box>
          <Box>
            <Text color="brownGrey.500" fontSize="xs">
              Rating
            </Text>
            <HStack>
              <StarRating
                fontSize="sm"
                rating={props.ratingAvg}
                ratingTotal={props.totalReview}
                iconWidth="14px"
                iconHeight="14px"
                useSingleStar
              />
            </HStack>
          </Box>
        </HStack>
      )}
      <Text
        color="charcoalGrey"
        fontSize="md"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Biaya Chat Online
      </Text>
      <HStack>
        <Text color="sea.500" fontSize="xl" fontWeight="bold">
          {props.consultationFee}
        </Text>
        {props.consultationStrikeFee && (
          <Text
            color="brownGrey.500"
            fontSize="sm"
            textDecoration="line-through"
          >
            {props.consultationStrikeFee}
          </Text>
        )}
      </HStack>
    </VStack>
  );
}

export function ConsultationHCPInfoDesktopSkeleton() {
  return (
    <VStack
      align="start"
      justify="space-between"
      background="white"
      borderRadius="base"
      boxShadow="base"
      width="300px"
      p={6}
      spacing={3}
    >
      <Skeleton width="136px" height="24px" />
      <HStack>
        <SkeletonCircle boxSize="60px" />
        <Box>
          <Skeleton width="178px" height="19px" />
          <Skeleton width="128px" height="19px" my={1} />
          <Skeleton width="79px" height="16px" />
        </Box>
      </HStack>
      <HStack
        width="full"
        background="white"
        p={3}
        divider={
          <Divider
            height="33px"
            orientation="vertical"
            borderColor="veryLightPink"
            border="solid 0.5px"
          />
        }
        borderRadius="base"
        boxShadow="xs"
        justify="space-between"
      >
        <Box>
          <Skeleton width="70px" height="16px" mb={1} />
          <Skeleton width="87px" height="19px" />
        </Box>
        <Box>
          <Skeleton width="36px" height="16px" mb={1} />
          <Skeleton width="77px" height="19px" />
        </Box>
      </HStack>
      <Skeleton width="147px" height="24px" />
      <HStack>
        <Skeleton width="89px" height="27px" />
        <Skeleton width="65px" height="19px" />
      </HStack>
    </VStack>
  );
}
