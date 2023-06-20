import React from "react";
import {
  HStack,
  VStack,
  Box,
  Text,
  SehatqUserIcon,
  ExperienceYearIcon,
  useImage,
} from "../../user-interfaces";

type DoctorBubbleMobilePropsOther = {
  onNavigate: (value: number) => void;
};

export type DoctorBubbleMobileProps = {
  doctorImgSrc: string;
  doctorId: number;
  doctorName: string;
  specialityName: string;
  hospitalName: string;
  scheduleDay: string;
  scheduleTime: string;
  experience: string;
};

export function DoctorBubbleMobile(
  props: DoctorBubbleMobileProps & DoctorBubbleMobilePropsOther
) {
  const Image = useImage();
  const {
    doctorImgSrc,
    doctorId,
    doctorName,
    specialityName,
    hospitalName,
    scheduleDay,
    scheduleTime,
    experience,
    onNavigate,
  } = props;

  return (
    <Box
      width="100%"
      onClick={() => {
        onNavigate(doctorId);
      }}
      cursor="pointer"
    >
      <VStack
        spacing="2.5"
        align="normal"
        boxShadow="base"
        borderRadius="lg"
        p={3}
      >
        <HStack spacing={3}>
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
            <Text
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="xs"
              lineHeight="4"
            >
              {doctorName}
            </Text>

            <Text fontSize="xxs" color="sea.500">
              {specialityName}
            </Text>
            {experience && (
              <HStack spacing={1} width="full">
                <ExperienceYearIcon boxSize={3} />
                <Text
                  fontSize="xxs"
                  color="brownGrey.500"
                  fontWeight="semibold"
                >
                  {experience}
                </Text>
              </HStack>
            )}
          </Box>
        </HStack>
        <VStack
          spacing={1}
          align="normal"
          justify="space-between"
          background="iceBlue.500"
          borderRadius="base"
          py={1.5}
          px={2.5}
        >
          <Text fontSize="xxs" fontWeight="semibold" color="charcoalGrey">
            {hospitalName}
          </Text>
          <Text fontSize="xxs" fontWeight="semibold" color="sea.500">
            {scheduleDay} ({scheduleTime})
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
