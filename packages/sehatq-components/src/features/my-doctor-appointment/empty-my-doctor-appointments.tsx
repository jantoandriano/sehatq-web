import React from "react";
import {
  EmptyMyDoctorAppointmentsMobile,
  EmptyMyDoctorAppointmentsMobileProps,
} from "./empty-my-doctor-appointments-mobile";

import {
  EmptyMyDoctorAppointmentsDesktop,
  EmptyMyDoctorAppointmentsDesktopProps,
} from "./empty-my-doctor-appointments-desktop";

export type EmptyMyDoctorAppointmentsProps =
  | ({
      isMobile: true;
    } & EmptyMyDoctorAppointmentsMobileProps)
  | ({ isMobile: false } & EmptyMyDoctorAppointmentsDesktopProps);

export function EmptyMyDoctorAppointments(
  props: EmptyMyDoctorAppointmentsProps
) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <EmptyMyDoctorAppointmentsMobile {...otherProps} />;
  }
  return <EmptyMyDoctorAppointmentsDesktop {...otherProps} />;
}
