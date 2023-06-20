import React from "react";
import {
  BookingDoctorStatusName,
  BOOKING_DOCTOR_STATUS,
} from "./my-doctor-appointment-constant";
import {
  MyDoctorAppointmentsFiltersMobile,
  MyDoctorAppointmentsFiltersMobileProps,
} from "./my-doctor-appointments-filters-mobile";
import {
  MyDoctorAppointmentsFiltersDesktop,
  MyDoctorAppointmentsFiltersDesktopProps,
} from "./my-doctor-appointments-filters-desktop";

export type MyDoctorAppointmentsFiltersProps =
  | ({
      isMobile: true;
    } & MyDoctorAppointmentsFiltersMobileProps)
  | (({ isMobile: false } & MyDoctorAppointmentsFiltersDesktopProps) & {
      status: BookingDoctorStatusName;
    });

export function MyDoctorAppointmentsFilters(
  props: MyDoctorAppointmentsFiltersProps
) {
  const { status = BOOKING_DOCTOR_STATUS["all"].status, isMobile } = props;

  const { ...otherProps } = {
    ...props,
    status,
  };

  if (isMobile) {
    return <MyDoctorAppointmentsFiltersMobile {...otherProps} />;
  }
  return <MyDoctorAppointmentsFiltersDesktop {...otherProps} />;
}
