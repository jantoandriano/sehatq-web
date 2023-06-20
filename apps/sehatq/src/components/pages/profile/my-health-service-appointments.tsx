import React from "react";
import { MyHealthServiceAppointmentsDesktop } from "./my-health-service-appointments-desktop";
import { MyHealthServiceAppointmentsMobile } from "./my-health-service-appointments-mobile";

export type MyHealthServiceAppointmentsProps = { isMobile: boolean };

export function MyHealthServiceAppointments(
  props: MyHealthServiceAppointmentsProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <MyHealthServiceAppointmentsMobile />;
  }
  return <MyHealthServiceAppointmentsDesktop />;
}
