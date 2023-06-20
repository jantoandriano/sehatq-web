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
} from "../../user-interfaces";

export interface MyTelemedicineCardMobileProps {
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

export function MyTelemedicineCardMobile(props: MyTelemedicineCardMobileProps) {
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
        <ChatActivityIcon boxSize="16px" />
        <Text
          ml={2}
          flex="1"
          color="sea.500"
          fontSize="xs"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Chat Dokter
        </Text>
        <Text fontSize="10px" color="iceBlue.700">
          {chatDate}
        </Text>
      </Flex>
      <Flex
        justify="flex-start"
        align="start"
        px={4}
        py={2.5}
        width="100%"
        borderY="0.5px solid #dadada"
      >
        <Avatar name={doctorName} src={doctorImageSrc} />
        <Box ml={3}>
          <Text fontWeight="semibold" fontSize="sm" fontFamily="poppins">
            {doctorName}
          </Text>
          {doctorSpeciality ? (
            <Text fontSize="xxs" color="brownGrey.500">
              {doctorSpeciality}
            </Text>
          ) : null}
          {doctorHospital ? (
            <Text mt={0.5} mb={1} fontSize="xxs">
              {doctorHospital}
            </Text>
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
        </Box>
      </Flex>
      <Flex p={3} justify="space-between" align="center">
        <Flex>
          {hasDoctorNote ? (
            <Box mr={2}>
              <DoctorNoteIcon boxSize="32px" />
            </Box>
          ) : null}
          <Box>
            <Text color="brownGrey.500" fontSize="xs">
              Biaya
            </Text>
            <Text
              fontSize="xs"
              fontWeight={consultationFee === "GRATIS" ? "semibold" : "bold"}
              color={consultationFee === "GRATIS" ? undefined : "sea.500"}
            >
              {consultationFee}
            </Text>
          </Box>
        </Flex>
        {chatDuration ? (
          <Box mx={2}>
            <Text color="brownGrey.500" fontSize="xs">
              Durasi
            </Text>
            <Text textAlign="right" fontSize="xs" fontWeight="semibold">
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
      </Flex>
    </Box>
  );
}
