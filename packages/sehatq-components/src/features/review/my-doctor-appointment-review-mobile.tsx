import React from "react";
import { Box, Button } from "../../user-interfaces";
import { CustomerServiceReviewModal } from "./customer-service-review-modal";
import {
  MyDoctorAppointmentReviewStepKey,
  MY_DOCTOR_APPOINTMENT_REVIEW_STEP,
} from "./my-doctor-appointment-review-constants";
import { MyDoctorAppointmentReviewModal } from "./my-doctor-appointment-review-modal";
import { MyDoctorAppointmentReviewResultModal } from "./my-doctor-appointment-review-result-modal";

export type MyDoctorAppointmentReviewMobileProps = {
  bookingId: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  step: MyDoctorAppointmentReviewStepKey;
  onSuccessSubmitMyDoctorAppointmentReview: () => void;
  onSuccessSubmitCustomerServiceReview: () => void;
  children?: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
};
export function MyDoctorAppointmentReviewMobile(
  props: MyDoctorAppointmentReviewMobileProps
) {
  const {
    bookingId,
    step,
    isOpen,
    onOpen,
    onClose,
    onSuccessSubmitMyDoctorAppointmentReview,
    onSuccessSubmitCustomerServiceReview,
    children = (
      <Button
        variant="outline"
        colorScheme="sea"
        size="sm"
        fontSize="xs"
        width="90px"
      >
        Beri Nilai
      </Button>
    ),
    title,
    description,
    imageSrc,
  } = props;

  return (
    <>
      <Box w="100%" onClick={onOpen}>
        {children}
      </Box>
      {step === MY_DOCTOR_APPOINTMENT_REVIEW_STEP["time-of-filled"] ? (
        <MyDoctorAppointmentReviewModal
          bookingId={bookingId}
          title={title}
          isOpen={isOpen}
          description={description}
          imageSrc={imageSrc}
          onClose={onClose}
          onSuccessSubmit={onSuccessSubmitMyDoctorAppointmentReview}
          isMobile
        />
      ) : null}
      {step === MY_DOCTOR_APPOINTMENT_REVIEW_STEP["half-filled"] ? (
        <CustomerServiceReviewModal
          bookingId={bookingId}
          onClose={onClose}
          isOpen={isOpen}
          onSuccessSubmit={onSuccessSubmitCustomerServiceReview}
          isMobile
        />
      ) : null}
      {step === MY_DOCTOR_APPOINTMENT_REVIEW_STEP["done"] ? (
        <MyDoctorAppointmentReviewResultModal
          isMobile
          bookingId={bookingId}
          onClose={onClose}
          isOpen={isOpen}
        />
      ) : null}
    </>
  );
}
