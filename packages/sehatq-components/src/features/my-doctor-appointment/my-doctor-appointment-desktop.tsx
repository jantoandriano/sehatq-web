import React from "react";

import { BadgeProps, VStack, Box, Text } from "../../user-interfaces";
import { PatientInfoCard } from "../profile/patient-info-card";
import { MyDoctorAppointmentReviewStepKey } from "../review/my-doctor-appointment-review-constants";
import { MyDoctorAppointmentInfoCard } from "./my-doctor-appointment-info-card";
import { BookingDoctorStatusCode } from "./my-doctor-appointment-constant";
import { MyDoctorAppointmentAttendanceConfirmation } from "./my-doctor-appointment-attendance-confirmation";

export interface MyDoctorAppointmentDesktopProps {
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
  rating?: {
    status: string;
    stepBackdrop: MyDoctorAppointmentReviewStepKey;
  };
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function MyDoctorAppointmentDesktop(
  props: MyDoctorAppointmentDesktopProps
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
    <Box
      border="0.5px solid"
      borderColor="veryLightPink"
      borderRadius="xl"
      overflow="hidden"
      mt={5}
    >
      <Box borderBottom="1px solid" borderColor="veryLightPink" px={9} py={4}>
        <Text fontWeight="semibold" fontSize="lg">
          Detail Booking Dokter
        </Text>
      </Box>
      <VStack spacing={5} background="iceBlue.500" px={5} py={4} w="100%">
        <PatientInfoCard isMobile={false} {...props} />
        <MyDoctorAppointmentInfoCard
          isMobile={false}
          {...props}
          status={statusCode}
          onOpenAttendanceConfirmation={onOpen}
        />
        <MyDoctorAppointmentAttendanceConfirmation
          isMobile={false}
          bookingId={bookingId}
          isOpen={isOpen}
          onClose={onClose}
          onSuccessSubmit={onSuccessSubmitMyDoctorAppointmentReview}
        />
      </VStack>
    </Box>
  );
}
