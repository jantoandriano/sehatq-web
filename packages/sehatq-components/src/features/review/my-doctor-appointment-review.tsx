import React, { useState } from "react";
import { useDisclosure } from "../../user-interfaces";
import { MyDoctorAppointmentReviewStepKey } from "./my-doctor-appointment-review-constants";
import { MyDoctorAppointmentReviewDesktop } from "./my-doctor-appointment-review-desktop";
import { MyDoctorAppointmentReviewMobile } from "./my-doctor-appointment-review-mobile";
export type MyDoctorAppointmentReviewProps = {
  isMobile?: boolean;
  defaultStep: MyDoctorAppointmentReviewStepKey;
  bookingId: string;
  onSuccessSubmitMyDoctorAppointmentReview: () => void;
  onSuccessSubmitCustomerServiceReview: () => void;
  children?: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
};

export function MyDoctorAppointmentReview(
  props: MyDoctorAppointmentReviewProps
) {
  const {
    isMobile,
    defaultStep,
    bookingId,
    children,
    onSuccessSubmitMyDoctorAppointmentReview,
    onSuccessSubmitCustomerServiceReview,
    title,
    description,
    imageSrc,
  } = props;
  const [step, setStep] = useState(defaultStep);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function customOnSuccessSubmitMyDoctorAppointmentReview() {
    onSuccessSubmitMyDoctorAppointmentReview();
    setStep("half-filled");
  }

  function customOnSuccessSubmitCustomerServiceReview() {
    onSuccessSubmitCustomerServiceReview();
    setStep("full-filled");
  }

  const otherProps = {
    bookingId,
    step,
    isOpen,
    onOpen,
    onClose,
    children,
    title,
    description,
    imageSrc,
    onSuccessSubmitMyDoctorAppointmentReview:
      customOnSuccessSubmitMyDoctorAppointmentReview,
    onSuccessSubmitCustomerServiceReview:
      customOnSuccessSubmitCustomerServiceReview,
  };

  if (isMobile) return <MyDoctorAppointmentReviewMobile {...otherProps} />;

  return <MyDoctorAppointmentReviewDesktop {...otherProps} />;
}
