import React from "react";
import {
  HStack,
  VStack,
  Box,
  Text,
  Flex,
  StarIcon,
  ExperienceYearIcon,
  SehatqUserIcon,
  useImage,
} from "../../user-interfaces";

export type TelemedicineBubbleMobileProps = {
  doctorImgSrc: string;
  doctorName: string;
  doctorSlug: string;
  specialityName: string;
  hospitalName: string;
  ratingAverage: number;
  ratingTotal: number;
  experience: string;
  doctorRecommendationId: string;
  handleClickDoctorRecommendation?: () => void;
};

export function TelemedicineBubbleMobile(props: TelemedicineBubbleMobileProps) {
  const {
    doctorImgSrc,
    doctorName,
    specialityName,
    hospitalName,
    ratingAverage,
    ratingTotal,
    experience,
    handleClickDoctorRecommendation,
  } = props;
  const Image = useImage();

  return (
    <Box width="100%" onClick={handleClickDoctorRecommendation}>
      <VStack
        spacing="2.5"
        align="normal"
        boxShadow="base"
        borderRadius="lg"
        p={3}
      >
        <HStack spacing={2}>
          <Box>
            {doctorImgSrc ? (
              <Image
                src={doctorImgSrc}
                alt={doctorName}
                layout="fill"
                objectFit="contain"
                wrapperProps={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "full",
                  overflow: "hidden",
                }}
              />
            ) : (
              <SehatqUserIcon boxSize="50px" />
            )}
          </Box>
          <Box>
            <Text fontFamily="poppins" fontWeight="semibold" fontSize="xs">
              {doctorName}
            </Text>
            <Text fontSize="xxs" color="sea.500">
              {specialityName}
            </Text>
            <Text fontSize="xxs" fontWeight="semibold">
              {hospitalName}
            </Text>
          </Box>
        </HStack>
        <Flex>
          <HStack flex={1} spacing={1} width="full" align="flex-start">
            <StarIcon color="squash.500" iconWidth="16px" iconHeight="16px" />
            <Text fontSize="xxs" color="charcoalGrey" fontWeight="semibold">
              {ratingAverage}
            </Text>
            <Text fontSize="xxs" color="brownGrey.500">
              ({ratingTotal})
            </Text>
          </HStack>
          <HStack flex={1.5} spacing={1} width="full" align="flex-start">
            <ExperienceYearIcon boxSize="16px" />
            <Text fontSize="xxs" color="brownGrey.500" fontWeight="semibold">
              {experience}
            </Text>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
}
