import React, { MouseEventHandler } from "react";
import { useNavigation, NavigationValue } from "@sehatq/utils";
import {
  Avatar,
  Box,
  ChatActivityIcon,
  DoctorNoteIcon,
  Flex,
  StarRating,
  Text,
  Link,
  Stack,
  HStack,
} from "../../user-interfaces";

export interface MyTelemedicineCardDesktopProps {
  chatDate: string;
  doctorImageSrc: string;
  doctorName: string;
  doctorSpeciality?: string;
  doctorHospital?: string;
  doctorRating?: number;
  doctorRatingTotal?: number;
  hasDoctorNote?: boolean;
  consultationFee: string;
  chatDuration: number;
  iconWidth?: number;
  iconHeight?: number;
  onClick?: MouseEventHandler;
  chatNavigation?: NavigationValue;
}

export function MyTelemedicineCardDesktop(
  props: MyTelemedicineCardDesktopProps
) {
  const {
    chatDate,
    doctorImageSrc,
    doctorName,
    doctorSpeciality,
    doctorHospital,
    doctorRating,
    doctorRatingTotal,
    hasDoctorNote,
    consultationFee,
    chatDuration,
    iconWidth,
    iconHeight,
    onClick,
    chatNavigation,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <Box
      onClick={onClick}
      boxShadow="base"
      borderRadius="xl"
      background="white"
    >
      <Flex align="center" py={2.5} px={3}>
        <ChatActivityIcon boxSize="20px" />
        <Text
          ml={2}
          flex="1"
          color="sea.500"
          fontSize="sm"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Chat Dokter
        </Text>
        <Text fontSize="sm" color="brownGrey.500">
          {chatDate}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        px={4}
        py={2.5}
        borderTop="0.5px solid"
        borderColor="veryLightPink"
      >
        <HStack spacing="3" flex={1}>
          <Box>
            <Avatar
              name={doctorName}
              src={doctorImageSrc}
              width="80px"
              height="80px"
            />
          </Box>
          <Stack spacing={0.5}>
            <Text fontWeight="semibold" fontSize="sm" fontFamily="poppins">
              {doctorName}
            </Text>
            {doctorSpeciality ? (
              <Text fontSize="xs" color="brownGrey.500">
                {doctorSpeciality}
              </Text>
            ) : null}
            {doctorHospital ? (
              <Text fontSize="xs">{doctorHospital}</Text>
            ) : null}
            {doctorRating ? (
              <StarRating
                rating={doctorRating}
                ratingTotal={doctorRatingTotal}
                iconWidth={iconWidth}
                iconHeight={iconHeight}
                useSingleStar
              />
            ) : null}
          </Stack>
        </HStack>
        <HStack spacing={3} align="center" flex={1} justify="flex-end">
          {hasDoctorNote ? (
            <Box>
              <DoctorNoteIcon boxSize="34px" />
            </Box>
          ) : null}
          <Box>
            <Text color="brownGrey.500" fontSize="sm">
              Biaya
            </Text>
            <Text
              fontSize="sm"
              fontWeight={consultationFee === "GRATIS" ? "semibold" : "bold"}
              color={consultationFee === "GRATIS" ? undefined : "sea.500"}
            >
              {consultationFee}
            </Text>
          </Box>
          {chatDuration ? (
            <Box>
              <Text color="brownGrey.500" fontSize="sm">
                Durasi
              </Text>
              <Text fontSize="sm" fontWeight="semibold">
                {`${chatDuration} Menit`}
              </Text>
            </Box>
          ) : null}
          {chatNavigation ? (
            <Navigate name={chatNavigation.name} query={chatNavigation.query}>
              <Link
                fontSize="xs"
                colorScheme="sea"
                variant="outline"
                height="26px"
              >
                Lihat Detail
              </Link>
            </Navigate>
          ) : null}
        </HStack>
      </Flex>
    </Box>
  );
}
