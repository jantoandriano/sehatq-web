import React from "react";

import { intervalDays } from "@sehatq/utils";
import {
  MyDoctorAppointmentCache,
  useGetMyDoctorAppointment,
} from "./my-doctor-appointments-queries";
import { MyDoctorAppointmentExpiredReviewDesktop } from "./my-doctor-appointment-expired-review-desktop";
import { MyDoctorAppointmentExpiredReviewMobile } from "./my-doctor-appointment-expired-review-mobile";
import { BOOKING_DOCTOR_STATUS } from "./my-doctor-appointment-constant";

export type MyDoctorAppointmentExpiredReviewProps = {
  isMobile?: boolean;
  bookingId: string;
};

function selectBookingDate(response: MyDoctorAppointmentCache) {
  return {
    bookingDate: response.bookingDate,
    status: response.status,
  };
}

export function MyDoctorAppointmentExpiredReview(
  props: MyDoctorAppointmentExpiredReviewProps
) {
  const { isMobile, bookingId } = props;
  const { data } = useGetMyDoctorAppointment(
    { bookingId },
    { select: selectBookingDate }
  );

  let isShowExpiredReview = false;
  const intervalDay = data?.bookingDate
    ? intervalDays(new Date(data?.bookingDate))
    : null;
  if (
    data &&
    intervalDay &&
    intervalDay >= 8 &&
    [
      BOOKING_DOCTOR_STATUS["confirmed"].status,
      BOOKING_DOCTOR_STATUS["attended"].status,
    ].some((item) => data.status === item)
  ) {
    isShowExpiredReview = true;
  }

  if (isShowExpiredReview) {
    if (isMobile) {
      return <MyDoctorAppointmentExpiredReviewMobile />;
    }
    return <MyDoctorAppointmentExpiredReviewDesktop />;
  }
  return null;
}
