import React from "react";
import { MyDoctorAppointmentDesktop } from "./my-doctor-appointment-desktop";
import { MyDoctorAppointmentMobile } from "./my-doctor-appointment-mobile";

export type MyDoctorAppointmentProps = { isMobile: boolean };

export function MyDoctorAppointment(props: MyDoctorAppointmentProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <MyDoctorAppointmentMobile />;
  }
  return <MyDoctorAppointmentDesktop />;
}
