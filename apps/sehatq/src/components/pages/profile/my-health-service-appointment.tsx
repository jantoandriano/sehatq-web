import React from "react";
import { MyHealthServiceAppointmentDesktop } from "./my-health-service-appointment-desktop";
import { MyHealthServiceAppointmentMobile } from "./my-health-service-appointment-mobile";

export type MyHealthServiceAppointmentProps = {
  bookingId: string;
  isMobile: boolean;
};

export function MyHealthServiceAppointment(
  props: MyHealthServiceAppointmentProps
) {
  const { bookingId, isMobile } = props;
  if (isMobile) {
    return <MyHealthServiceAppointmentMobile id={bookingId} />;
  }
  return <MyHealthServiceAppointmentDesktop id={bookingId} />;
}
