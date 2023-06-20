import React from "react";
import { MyDoctorAppointmentsDesktop } from "./my-doctor-appointments-desktop";
import { MyDoctorAppointmentsMobile } from "./my-doctor-appointments-mobile";

export type MyDoctorAppointmentsProps = { isMobile: boolean };

export function MyDoctorAppointments(props: MyDoctorAppointmentsProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <MyDoctorAppointmentsMobile />;
  }
  return <MyDoctorAppointmentsDesktop />;
}
