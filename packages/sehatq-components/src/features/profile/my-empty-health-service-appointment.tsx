import React from "react";
import { MyEmptyHealthServiceAppointmentDesktop } from "./my-empty-health-service-appointment-desktop";
import { MyEmptyHealthServiceAppointmentMobile } from "./my-empty-health-service-appointment-mobile";

export type MyEmptyHealthServiceAppointmentProps = { isMobile: boolean };

export function MyEmptyHealthServiceAppointment(
  props: MyEmptyHealthServiceAppointmentProps
) {
  const { isMobile, ...otherProps } = props;
  if (isMobile) {
    return <MyEmptyHealthServiceAppointmentMobile {...otherProps} />;
  }
  return <MyEmptyHealthServiceAppointmentDesktop {...otherProps} />;
}
