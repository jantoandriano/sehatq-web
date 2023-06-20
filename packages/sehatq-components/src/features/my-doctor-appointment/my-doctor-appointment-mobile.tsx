import React from "react";

import { BadgeProps, VStack, Flex, Box } from "../../user-interfaces";
import { PatientInfoCard } from "../profile/patient-info-card";
import { MyDoctorAppointmentReviewStepKey } from "../review/my-doctor-appointment-review-constants";
import { MyDoctorAppointmentInfoCard } from "./my-doctor-appointment-info-card";
import { BookingDoctorStatusCode } from "./my-doctor-appointment-constant";
import { MyDoctorAppointmentAttendanceConfirmation } from "./my-doctor-appointment-attendance-confirmation";

export interface MyDoctorAppointmentMobileProps {
  doctorImgSrc: string;
  bookingId: string;
  utmSource?: string;
  bookingDate: string;
  bookingTime: string;
  arrivalDate: string;
  createdAt: string;
  doctorName: string;
  doctorSpeciality: string;
  doctorSlug: string;
  hospitalName: string;
  hospitalAddress: string;
  patientName: string;
  patientDob: string;
  patientAddress: string;
  patientPhone: string;
  isConfirmedAttendance: number | null;
  partnerUrl: string | null;
  status: {
    id: string;
    label: string;
    color: BadgeProps["colorScheme"];
  };
  statusCode: BookingDoctorStatusCode;
  placeholderUserImg: React.ReactElement;
  onSuccessCancelationReason: () => void;
  onSuccessSubmitMyDoctorAppointmentReview: () => void;
  rating?: { status: string; stepBackdrop: MyDoctorAppointmentReviewStepKey };
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function MyDoctorAppointmentMobile(
  props: MyDoctorAppointmentMobileProps
) {
  const {
    statusCode,
    bookingId,
    isOpen,
    onOpen,
    onClose,
    onSuccessSubmitMyDoctorAppointmentReview,
  } = props;
  return (
    <Box background="iceBlue.500" minHeight="calc(100vh - 56px)">
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        p={4}
        height="100%"
        minHeight="calc(100vh - 56px)"
      >
        <VStack spacing={2} w="100%">
          <PatientInfoCard isMobile {...props} />
          <MyDoctorAppointmentInfoCard
            isMobile
            {...props}
            status={statusCode}
            onOpenAttendanceConfirmation={onOpen}
          />
          <MyDoctorAppointmentAttendanceConfirmation
            isMobile
            bookingId={bookingId}
            isOpen={isOpen}
            onClose={onClose}
            onSuccessSubmit={onSuccessSubmitMyDoctorAppointmentReview}
          />
        </VStack>
      </Flex>
    </Box>
  );
}
