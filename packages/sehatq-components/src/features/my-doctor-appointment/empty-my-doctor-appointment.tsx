import React from "react";
import { EmptyMyDoctorAppointmentDesktop } from "./empty-my-doctor-appointment-desktop";
import { EmptyMyDoctorAppointmentMobile } from "./empty-my-doctor-appointment-mobile";

export type EmptyMyDoctorAppointmentProps = {
  isMobile?: boolean;
};

export function EmptyMyDoctorAppointment(props: EmptyMyDoctorAppointmentProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <EmptyMyDoctorAppointmentMobile />;
  }
  return <EmptyMyDoctorAppointmentDesktop />;
}
