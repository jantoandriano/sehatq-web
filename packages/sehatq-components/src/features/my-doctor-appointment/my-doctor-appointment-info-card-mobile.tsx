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

export interface MyDoctorAppointmentInfoCardMobileProps {
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

export function MyDoctorAppointmentInfoCardMobile({
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
}: MyDoctorAppointmentInfoCardMobileProps) {
  return (
    <VStack spacing={4} width="full">
      <VStack
        background="white"
        borderRadius="10px"
        boxShadow="base"
        px={3.5}
        pt={3}
        pb={3.5}
        align="flex-start"
        spacing={3}
        width="100%"
      >
        <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
          Informasi Dokter
        </Text>
        <Divider borderColor="veryLightPink" />
        <VStack align="flex-start" spacing={3} width="100%">
          <Flex align="center">
            <Avatar
              src={doctorImgSrc}
              name={doctorName}
              boxSize="52px"
              icon={placeholderUserImg}
            />
            <VStack align="flex-start" spacing={0} ml={2}>
              <Text fontSize="sm" fontWeight="semibold">
                {doctorName}
              </Text>
              <Text fontSize="xxs" color="brownGrey.500">
                {doctorSpeciality}
              </Text>
            </VStack>
          </Flex>
          <Box>
            <Text color="brownGrey.500" fontSize="xxs">
              Tanggal Booking
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {bookingDate}
            </Text>
          </Box>
          <Box>
            <Text color="brownGrey.500" fontSize="xxs">
              Tanggal Kedatangan
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {arrivalDate}
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Pukul {bookingTime}
            </Text>
          </Box>
          <Box
            width="100%"
            bgColor="iceBlue.500"
            borderRadius="base"
            px={4}
            py={2.5}
          >
            <Text fontSize="sm" fontWeight="semibold">
              {hospitalName}
            </Text>
            <Text fontSize="sm">{hospitalAddress}</Text>
          </Box>
          {partnerUrl && (
            <Link
              justifyContent="center"
              variant="outline"
              color="sea.500"
              borderColor="main.500"
              fontWeight="semibold"
              size="md"
              mr={1}
              mt={3}
              href={partnerUrl}
              width="full"
            >
              Lihat Info Booking
            </Link>
          )}
        </VStack>
      </VStack>
      {(!partnerUrl || partnerUrl === "") && (
        <VStack
          background="white"
          borderRadius="20px"
          boxShadow="base"
          px={7}
          py={5}
          spacing={4}
          textAlign="center"
        >
          <Text fontSize="sm">
            Gunakan QR berikut untuk proses pendaftaran di faskes
          </Text>
          {bookingId ? (
            <QRCode value={bookingId} level="M" size={200} />
          ) : (
            <Text mt={4} fontSize="sm" fontWeight="semibold">
              Gagal memuat QR
            </Text>
          )}
        </VStack>
      )}
      <MyDoctorAppointmentActions
        isMobile={true}
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

export function MyDoctorAppointmentInfoCardSkeletonMobile() {
  return (
    <VStack spacing={4}>
      <VStack
        background="white"
        borderRadius="10px"
        boxShadow="base"
        px={3.5}
        pt={3}
        pb={3.5}
        align="flex-start"
        spacing={3}
        width="100%"
      >
        <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
          Informasi Dokter
        </Text>
        <Divider borderColor="veryLightPink" />
        <VStack align="flex-start" spacing={3} width="100%">
          <Flex align="center">
            <SkeletonCircle boxSize="52px" />
            <VStack align="flex-start" ml={2} spacing={1}>
              <Skeleton width="200px" height="19px" />
              <Skeleton width="100px" height="14px" />
            </VStack>
          </Flex>
          <Box>
            <Text color="brownGrey.500" fontSize="xxs">
              Tanggal Booking
            </Text>
            <Skeleton width="96px" height="19px" />
          </Box>
          <Box>
            <Text color="brownGrey.500" fontSize="xxs">
              Tanggal Kedatangan
            </Text>
            <Skeleton width="120px" height="16px" mb={1} />
            <Skeleton width="126px" height="16px" />
          </Box>
          <Box
            bgColor="iceBlue.500"
            borderRadius="base"
            px={4}
            py={2.5}
            width="100%"
          >
            <Skeleton width="115px" height="19px" mb={1} />
            <Skeleton width="176px" height="19px" />
          </Box>
        </VStack>
      </VStack>
      <VStack
        background="white"
        borderRadius="20px"
        boxShadow="base"
        px={7}
        py={5}
        spacing={4}
        textAlign="center"
      >
        <Text fontSize="sm">
          Gunakan QR berikut untuk proses pendaftaran di faskes
        </Text>
        <Skeleton width="200px" height="200px" />
      </VStack>
      <Skeleton width="100%" height="40px" />
    </VStack>
  );
}
