import React from "react";
import QRCode from "qrcode.react";

import {
  VStack,
  Box,
  Flex,
  Text,
  Divider,
  Avatar,
  Skeleton,
  SkeletonCircle,
  Link,
} from "../../user-interfaces";
import { MyDoctorAppointmentReviewStepKey } from "../review/my-doctor-appointment-review-constants";
import { BookingDoctorStatusCode } from "./my-doctor-appointment-constant";
import { MyDoctorAppointmentActions } from "./my-doctor-appointment-actions";

export interface MyDoctorAppointmentInfoCardDesktopProps {
  doctorImgSrc: string;
  bookingId: string;
  utmSource?: string;
  bookingDate: string;
  bookingTime: string;
  arrivalDate: string;
  doctorName: string;
  doctorSpeciality: string;
  doctorSlug: string;
  hospitalName: string;
  hospitalAddress: string;
  isConfirmedAttendance: number | null;
  partnerUrl: string | null;
  status: BookingDoctorStatusCode;
  placeholderUserImg: React.ReactElement;
  onSuccessCancelationReason: () => void;
  onSuccessSubmitMyDoctorAppointmentReview: () => void;
  rating?: { status: string; stepBackdrop: MyDoctorAppointmentReviewStepKey };
  onOpenAttendanceConfirmation: () => void;
}

export function MyDoctorAppointmentInfoCardDesktop({
  doctorImgSrc,
  bookingId,
  bookingDate,
  bookingTime,
  arrivalDate,
  doctorName,
  doctorSpeciality,
  doctorSlug,
  hospitalName,
  hospitalAddress,
  isConfirmedAttendance,
  partnerUrl,
  status,
  placeholderUserImg,
  onSuccessCancelationReason,
  onSuccessSubmitMyDoctorAppointmentReview,
  rating,
  onOpenAttendanceConfirmation,
}: MyDoctorAppointmentInfoCardDesktopProps) {
  return (
    <VStack
      background="white"
      borderRadius="10px"
      boxShadow="base"
      px={6}
      pt={4}
      pb={6}
      align="flex-start"
      spacing={4}
      width="100%"
    >
      <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
        Informasi Dokter
      </Text>
      <Divider borderColor="veryLightPink" />
      <Flex w="100%">
        <VStack flex={1} align="flex-start" spacing={4}>
          <Flex align="center">
            <Avatar
              src={doctorImgSrc}
              name={doctorName}
              boxSize="80px"
              icon={placeholderUserImg}
            />
            <VStack align="flex-start" spacing={0} ml={2}>
              <Text fontSize="sm" fontWeight="semibold">
                {doctorName}
              </Text>
              <Text fontSize="xs" color="brownGrey.500">
                {doctorSpeciality}
              </Text>
            </VStack>
          </Flex>
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs">
              Tanggal Booking
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {bookingDate}
            </Text>
          </Box>
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs">
              Tanggal Kedatangan
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {arrivalDate}
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Pukul {bookingTime}
            </Text>
          </Box>
          <Box bgColor="iceBlue.500" borderRadius="base" px={5} py={2.5}>
            <Text fontSize="sm" fontWeight="semibold">
              {hospitalName}
            </Text>
            <Text fontSize="sm">{hospitalAddress}</Text>
          </Box>
        </VStack>
        {partnerUrl ? (
          <Link
            justifyContent="center"
            variant="outline"
            color="sea.500"
            borderColor="main.500"
            fontWeight="semibold"
            size="md"
            width="221px"
            mr={1}
            mt={3}
            href={partnerUrl}
          >
            Lihat Info Booking
          </Link>
        ) : (
          <VStack textAlign="center" px={4} spacing={4}>
            <Text fontSize="sm" maxW="268px">
              Gunakan QR berikut untuk proses pendaftaran di faskes
            </Text>
            {bookingId ? (
              <QRCode
                value={bookingId}
                level="M"
                size={200}
                style={{ marginRight: "auto", marginLeft: "auto" }}
              />
            ) : (
              <Text mt={4} fontSize="sm" fontWeight="semibold">
                Gagal memuat QR
              </Text>
            )}
          </VStack>
        )}
      </Flex>
      <MyDoctorAppointmentActions
        isMobile={false}
        doctorSlug={doctorSlug}
        status={status}
        bookingId={bookingId}
        onSuccessCancelationReason={onSuccessCancelationReason}
        rating={rating}
        onSuccessSubmitMyDoctorAppointmentReview={
          onSuccessSubmitMyDoctorAppointmentReview
        }
        doctorName={doctorName}
        doctorSpeciality={doctorSpeciality}
        doctorImgSrc={doctorImgSrc}
        isConfirmedAttendance={isConfirmedAttendance}
        onOpenAttendanceConfirmation={onOpenAttendanceConfirmation}
      />
    </VStack>
  );
}

export function MyDoctorAppointmentInfoCardSkeletonDesktop() {
  return (
    <VStack
      background="white"
      borderRadius="10px"
      boxShadow="base"
      px={6}
      pt={4}
      pb={6}
      align="flex-start"
      spacing={4}
    >
      <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
        Informasi Dokter
      </Text>
      <Divider borderColor="veryLightPink" />
      <Flex w="100%">
        <VStack flex={1} align="flex-start" spacing={4}>
          <Flex px="10px" pb="10px" align="center">
            <SkeletonCircle boxSize="80px" />
            <VStack align="flex-start" spacing={1} ml={2}>
              <Skeleton width="170px" height="19px" />
              <Skeleton width="121px" height="17px" />
            </VStack>
          </Flex>
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs">
              Tanggal Booking
            </Text>
            <Skeleton width="96px" height="19px" />
          </Box>
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs">
              Tanggal Kedatangan
            </Text>
            <Skeleton width="120px" height="16px" mb={1} />
            <Skeleton width="126px" height="16px" />
          </Box>
          <Box bgColor="iceBlue.500" borderRadius="base" px={5} py={2.5}>
            <Skeleton width="115px" height="19px" mb={1} />
            <Skeleton width="176px" height="19px" />
          </Box>
        </VStack>
        <VStack textAlign="center" px={4} spacing={4}>
          <Text fontSize="sm" maxW="268px">
            Gunakan QR berikut untuk proses pendaftaran di faskes
          </Text>
          <Skeleton width="200px" height="200px" />
        </VStack>
      </Flex>
      <Skeleton width="670px" height="40px" />
    </VStack>
  );
}
