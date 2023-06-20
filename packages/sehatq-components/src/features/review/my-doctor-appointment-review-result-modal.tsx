import React from "react";
import {
  MyDoctorAppointmentCache,
  useGetMyDoctorAppointment,
} from "../my-doctor-appointment/my-doctor-appointments-queries";
import { CUSTOMER_SERVICE_REVIEW_OPTIONS } from "./customer-service-review-constants";
import {
  MyDoctorAppointmentReviewResultModalDesktop,
  MyDoctorAppointmentReviewResultModalDesktopProps,
} from "./my-doctor-appointment-review-result-modal-desktop";
import {
  MyDoctorAppointmentReviewResultModalMobile,
  MyDoctorAppointmentReviewResultModalMobileProps,
} from "./my-doctor-appointment-review-result-modal-mobile";

export type MyDoctorAppointmentReviewResultModalProps =
  | ({
      isMobile?: false;
      bookingId: string;
    } & MyDoctorAppointmentReviewResultModalDesktopProps["modalProps"])
  | ({
      isMobile: true;
      bookingId: string;
    } & MyDoctorAppointmentReviewResultModalMobileProps["modalProps"]);

function selectMyDoctorAppointmentReviewResult(
  response: MyDoctorAppointmentCache
) {
  const { doctorImgSrc, doctorName, doctorSpeciality, rating } = response;
  const csRating = Object.values(CUSTOMER_SERVICE_REVIEW_OPTIONS).find(
    (option) => option.value === rating?.cs.rating
  );
  return {
    doctorImgSrc,
    doctorName,
    doctorSpeciality,
    bookingRating: rating?.bookingDoctor && `${rating.bookingDoctor.rating}.0`,
    bookingReview: rating?.bookingDoctor.review,
    bookingReviewTags: rating?.bookingDoctor.tags,
    customerService: {
      rating: csRating?.id,
      ratingColor: csRating?.color,
      ratingIcon: csRating?.icon,
      tags: rating?.cs.tags || [],
      review: rating?.cs.review,
    },
  };
}

export function MyDoctorAppointmentReviewResultModal(
  props: MyDoctorAppointmentReviewResultModalProps
) {
  const { isMobile, bookingId, ...modalProps } = props;

  const { data: myDoctorAppointmentReviewResult } = useGetMyDoctorAppointment(
    {
      bookingId,
    },
    {
      select: selectMyDoctorAppointmentReviewResult,
    }
  );

  const otherProps = {
    modalProps,
    doctorImgSrc: "/",
    doctorName: "",
    doctorSpeciality: "",
    bookingRating: "",
    bookingReview: "",
    bookingReviewTags: [],
    ...myDoctorAppointmentReviewResult,
  };

  if (isMobile)
    return <MyDoctorAppointmentReviewResultModalMobile {...otherProps} />;

  return <MyDoctorAppointmentReviewResultModalDesktop {...otherProps} />;
}
