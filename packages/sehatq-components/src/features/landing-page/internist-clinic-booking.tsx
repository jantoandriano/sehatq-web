import React from "react";

import { InternistClinicBookingDesktop } from "./internist-clinic-booking-desktop";
import { InternistClinicBookingMobile } from "./internist-clinic-booking-mobile";

export type InternistClinicBookingProps = {
  isMobile: boolean;
};

export function InternistClinicBooking(props: InternistClinicBookingProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicBookingMobile />;
  }
  return <InternistClinicBookingDesktop />;
}
