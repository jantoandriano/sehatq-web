import React from "react";
import { NavigationValue, useNavigation } from "@sehatq/utils";

import { VStack, Link, Button } from "../../user-interfaces";
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

export interface MyDoctorAppointmentActionsMobileProps {
  doctorNavigation?: NavigationValue;
  mutateCancelationReason?: MyAppointmentCancelationProps["mutateCancelationReason"];
  onSuccessCancelationReason: () => void;
  status: BookingDoctorStatusCode;
  bookingId: string;
  rating?: { status: string; stepBackdrop: MyDoctorAppointmentReviewStepKey };
  onSuccessSubmitMyDoctorAppointmentReview: () => void;
  onOpenAttendanceConfirmation: () => void;
  doctorName: string;
  doctorSpeciality: string;
  doctorImgSrc: string;
  isConfirmedAttendance: number | null;
}

export function MyDoctorAppointmentActionsMobile({
  doctorNavigation,
  mutateCancelationReason,
  onSuccessCancelationReason,
  status,
  bookingId,
  rating,
  onSuccessSubmitMyDoctorAppointmentReview,
  onOpenAttendanceConfirmation,
  doctorName,
  doctorSpeciality,
  doctorImgSrc,
  isConfirmedAttendance,
}: MyDoctorAppointmentActionsMobileProps) {
  const { Navigate } = useNavigation();

  return (
    <VStack spacing={4} width="100%">
      {isConfirmedAttendance === 0 &&
      status === BOOKING_DOCTOR_STATUS["confirmed"].status ? (
        <Button
          justifyContent="center"
          variant="solid"
          colorScheme="main"
          size="md"
          fontSize="md"
          fontWeight="semibold"
          width="100%"
          onClick={onOpenAttendanceConfirmation}
        >
          Konfirmasi
        </Button>
      ) : null}
      {doctorNavigation &&
      [
        BOOKING_DOCTOR_STATUS["cancelled"].status,
        BOOKING_DOCTOR_STATUS["attended"].status,
        BOOKING_DOCTOR_STATUS["not-attended"].status,
        BOOKING_DOCTOR_STATUS["transfer"].status,
        BOOKING_DOCTOR_STATUS["cancelled-by-hcf"].status,
      ].some((item) => status === item) ? (
        <Navigate name={doctorNavigation.name} query={doctorNavigation.query}>
          <Link
            colorScheme="main"
            size="md"
            fontSize="md"
            variant="solid"
            width="100%"
          >
            Booking Lagi
          </Link>
        </Navigate>
      ) : null}
      {(rating?.status === MY_DOCTOR_APPOINTMENT_REVIEW_STATUS["give-rating"] ||
        rating?.status === MY_DOCTOR_APPOINTMENT_REVIEW_STATUS["done"]) &&
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
            variant="outline"
            colorScheme="main"
            size="md"
            fontSize="md"
            width="100%"
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
          isMobile
          bookingId={bookingId}
          mutateCancelationReason={mutateCancelationReason}
          onSuccessCancelationReason={onSuccessCancelationReason}
          isButtonFullWidth
        >
          <Button
            variant="outline"
            colorScheme="brownGrey"
            size="md"
            fontSize="md"
            width="100%"
          >
            Batalkan
          </Button>
        </MyAppointmentCancelation>
      ) : null}
    </VStack>
  );
}
