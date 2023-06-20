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

type DoctorBubbleDesktopPropsOther = {
  onNavigate: (value: number) => void;
};

export type DoctorBubbleDesktopProps = {
  doctorImgSrc: string;
  doctorId: number;
  doctorName: string;
  specialityName: string;
  hospitalName: string;
  scheduleDay: string;
  scheduleTime: string;
  experience: string;
};

export function DoctorBubbleDesktop(
  props: DoctorBubbleDesktopProps & DoctorBubbleDesktopPropsOther
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
        <HStack spacing={4}>
          <Box>
            {doctorImgSrc ? (
              <Image
                src={doctorImgSrc}
                alt={doctorName}
                layout="fill"
                objectFit="contain"
                wrapperProps={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "full",
                  overflow: "hidden",
                }}
              />
            ) : (
              <SehatqUserIcon boxSize="60px" />
            )}
          </Box>
          <Box>
            <Text fontFamily="poppins" fontWeight="semibold" fontSize="sm">
              {doctorName}
            </Text>
            <Text fontSize="xs" color="sea.500">
              {specialityName}
            </Text>
            {experience && (
              <HStack spacing={1} width="full">
                <ExperienceYearIcon boxSize={3} />
                <Text fontSize="xs" color="brownGrey.500" fontWeight="semibold">
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
          py={2}
          px={3}
          minW="336px"
        >
          <Text fontSize="xs" fontWeight="semibold" color="charcoalGrey">
            {hospitalName}
          </Text>
          <Text fontSize="xs" fontWeight="semibold" color="sea.500">
            {scheduleDay} ({scheduleTime})
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
