import React from "react";
import { NavigationValue, useNavigation } from "@sehatq/utils";
import {
  Box,
  Flex,
  BookingIcon,
  Text,
  Avatar,
  Badge,
  Link,
  Skeleton,
  SkeletonCircle,
  Button,
  VStack,
} from "../../user-interfaces";
import {
  MyAppointmentCancelation,
  MyAppointmentCancelationProps,
} from "../profile";
import { MyDoctorAppointmentReview } from "../review";
import {
  MyDoctorAppointmentReviewStepKey,
  MY_DOCTOR_APPOINTMENT_REVIEW_STATUS,
} from "../review/my-doctor-appointment-review-constants";
import {
  BookingDoctorStatusCode,
  BOOKING_DOCTOR_STATUS,
} from "./my-doctor-appointment-constant";

export interface MyDoctorAppointmentCardMobileProps {
  userId: string;
  doctorImgSrc: string;
  createdDate: string;
  bookingDate: string;
  bookingTime: string;
  bookingId: string;
  bookingIdLabel: string;
  doctorName: string;
  doctorSpeciality: string;
  patientName: string;
  hospitalName: string;
  isConfirmedAttendance: number | null;
  status: BookingDoctorStatusCode;
  rating?: { status: string; stepBackdrop: MyDoctorAppointmentReviewStepKey };
  doctorNavigation?: NavigationValue;
  mutateCancelationReason?: MyAppointmentCancelationProps["mutateCancelationReason"];
  onSuccessCancelationReason: () => void;
  onSuccessSubmitMyDoctorAppointmentReview: () => void;
}

export function MyDoctorAppointmentCardMobile(
  props: MyDoctorAppointmentCardMobileProps
) {
  const { Navigate } = useNavigation();
  const {
    userId,
    doctorImgSrc,
    doctorName,
    bookingId,
    bookingIdLabel,
    bookingDate,
    bookingTime,
    doctorSpeciality,
    patientName,
    createdDate,
    hospitalName,
    isConfirmedAttendance,
    status,
    rating,
    doctorNavigation,
    mutateCancelationReason,
    onSuccessCancelationReason,
    onSuccessSubmitMyDoctorAppointmentReview,
  } = props;
  return (
    <Box borderRadius="xl" boxShadow="base" backgroundColor="white">
      <Flex
        px="3.5"
        pt="3"
        pb="2.5"
        align="center"
        justify="space-between"
        borderBottom="0.5px solid"
        borderColor="veryLightPink"
      >
        <Flex align="center">
          <BookingIcon />
          <Text ml="2.5" color="sea.500" fontSize="xs" lineHeight="5">
            Booking
          </Text>
        </Flex>
        <Flex>
          <Text color="brownGrey.500" fontSize="xxs" lineHeight="5">
            {createdDate}
          </Text>
          {status !== BOOKING_DOCTOR_STATUS["all"].status ? (
            <Badge
              px="2.5"
              variant="solid"
              colorScheme={BOOKING_DOCTOR_STATUS[status]?.color}
              fontSize="xxs"
              ml="2.5"
              textTransform="capitalize"
            >
              {BOOKING_DOCTOR_STATUS[status].label}
            </Badge>
          ) : null}
        </Flex>
      </Flex>
      <Box px="3.5" py="2.5">
        <Flex>
          <Avatar src={doctorImgSrc} size="md" name={doctorName} mr="5" />
          <Box>
            <Navigate name="MY_BOOKING_DOCTOR" query={{ bookingId, userId }}>
              <Link color="sea.500" fontSize="xs" lineHeight="3">
                {bookingIdLabel}
              </Link>
            </Navigate>
            <Text fontFamily="poppins" fontSize="sm" fontWeight="semibold">
              {doctorName}
            </Text>
            <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
              {doctorSpeciality}
            </Text>
          </Box>
        </Flex>
        <Box
          mt="2.5"
          px="3.5"
          py="1.5"
          backgroundColor="iceBlue.500"
          borderRadius="base"
        >
          <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
            Nama Pasien
          </Text>
          <Text
            fontFamily="poppins"
            fontSize="sm"
            fontWeight="semibold"
            lineHeight="5"
          >
            {patientName}
          </Text>
        </Box>
        <Flex justify="space-between" pt="2.5">
          <Box>
            <Text fontSize="xs" fontWeight="semibold" marginBottom={1}>
              {hospitalName}
            </Text>
            <Text fontSize="xs">{`${bookingDate}, ${bookingTime}`}</Text>
          </Box>
          <VStack spacing="2" alignItems="start">
            {isConfirmedAttendance === 0 &&
            status === BOOKING_DOCTOR_STATUS["confirmed"].status ? (
              <Navigate name="MY_BOOKING_DOCTOR" query={{ bookingId, userId }}>
                <Link
                  justifyContent="center"
                  variant="solid"
                  colorScheme="main"
                  size="sm"
                  fontSize="xs"
                  fontWeight="semibold"
                  width="90px"
                  px="0"
                >
                  Konfirmasi
                </Link>
              </Navigate>
            ) : null}
            {doctorNavigation &&
            [
              BOOKING_DOCTOR_STATUS["cancelled"].status,
              BOOKING_DOCTOR_STATUS["attended"].status,
              BOOKING_DOCTOR_STATUS["not-attended"].status,
              BOOKING_DOCTOR_STATUS["transfer"].status,
              BOOKING_DOCTOR_STATUS["cancelled-by-hcf"].status,
            ].some((item) => status === item) ? (
              <Navigate
                name={doctorNavigation.name}
                query={doctorNavigation.query}
              >
                <Link
                  justifyContent="center"
                  variant="outline"
                  colorScheme="main"
                  size="sm"
                  fontSize="xs"
                  width="90px"
                  px="0"
                >
                  Booking Lagi
                </Link>
              </Navigate>
            ) : null}
            {rating &&
            (rating.status ===
              MY_DOCTOR_APPOINTMENT_REVIEW_STATUS["give-rating"] ||
              rating.status === MY_DOCTOR_APPOINTMENT_REVIEW_STATUS["done"]) &&
            status === BOOKING_DOCTOR_STATUS["attended"].status ? (
              <MyDoctorAppointmentReview
                bookingId={bookingId}
                defaultStep={rating.stepBackdrop}
                onSuccessSubmitMyDoctorAppointmentReview={
                  onSuccessSubmitMyDoctorAppointmentReview
                }
                onSuccessSubmitCustomerServiceReview={
                  onSuccessSubmitMyDoctorAppointmentReview
                }
                title={doctorName}
                description={doctorSpeciality}
                imageSrc={doctorImgSrc}
                isMobile
              >
                <Button
                  variant="solid"
                  colorScheme="main"
                  size="sm"
                  fontSize="xs"
                  width="90px"
                  justifyContent="center"
                >
                  {rating.status === MY_DOCTOR_APPOINTMENT_REVIEW_STATUS["done"]
                    ? "Lihat Penilaian"
                    : "Beri Nilai"}
                </Button>
              </MyDoctorAppointmentReview>
            ) : null}
            {mutateCancelationReason &&
            [
              BOOKING_DOCTOR_STATUS["new"].status,
              BOOKING_DOCTOR_STATUS["pending"].status,
              BOOKING_DOCTOR_STATUS["confirmed"].status,
            ].some((item) => status === item) ? (
              <MyAppointmentCancelation
                isMobile={true}
                bookingId={bookingId}
                mutateCancelationReason={mutateCancelationReason}
                onSuccessCancelationReason={onSuccessCancelationReason}
              />
            ) : null}
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}

export function MyDoctorAppointmentCardSkeletonMobile() {
  return (
    <Box boxShadow="base" borderRadius="xl" background="white">
      <Box borderRadius="xl" boxShadow="base" backgroundColor="white">
        <Flex
          px="3.5"
          pt="3"
          pb="2.5"
          align="center"
          justify="space-between"
          borderBottom="0.5px solid"
          borderColor="veryLightPink"
        >
          <Flex align="center">
            <BookingIcon />
            <Text ml="2.5" color="sea.500" fontSize="xs" lineHeight="5">
              Booking
            </Text>
          </Flex>
          <Flex>
            <Skeleton width="100px" height="10px" mb={1} />
          </Flex>
        </Flex>
        <Box px="3.5" py="2.5">
          <Flex>
            <SkeletonCircle boxSize="52px" mr={5} />
            <Box>
              <Skeleton width="100px" height="10px" mb={1} />
              <Skeleton width="100px" height="10px" mb={1} />
              <Skeleton width="100px" height="10px" mb={1} />
            </Box>
          </Flex>
          <Box
            mt="2.5"
            px="3.5"
            py="1.5"
            backgroundColor="iceBlue.500"
            borderRadius="base"
          >
            <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
              Nama Pasien
            </Text>
            <Skeleton width="100px" height="10px" mb={1} />
          </Box>
          <Flex justify="space-between" pt="2.5">
            <Box>
              <Skeleton width="100px" height="10px" mb={1} />
              <Skeleton width="100px" height="10px" mb={1} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
