import React from "react";

import { CardiacClinicBookingDesktop } from "./cardiac-clinic-booking-desktop";
import { CardiacClinicBookingMobile } from "./cardiac-clinic-booking-mobile";

export type CardiacClinicBookingProps = {
  isMobile: boolean;
};

export function CardiacClinicBooking(props: CardiacClinicBookingProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <CardiacClinicBookingMobile />;
  }
  return <CardiacClinicBookingDesktop />;
}
