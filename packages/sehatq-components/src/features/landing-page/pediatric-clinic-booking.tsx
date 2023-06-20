import React from "react";

import {
  PediatricClinicBookingDesktop,
  PediatricClinicBookingSkeletonDesktop,
} from "./pediatric-clinic-booking-desktop";
import {
  PediatricClinicBookingMobile,
  PediatricClinicBookingSkeletonMobile,
} from "./pediatric-clinic-booking-mobile";

export type PediatricClinicBookingProps = { isMobile: boolean };
export type PediatricClinicBookingSkeletonProps = { isMobile: boolean };

export function PediatricClinicBooking(props: PediatricClinicBookingProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <PediatricClinicBookingMobile />;
  }
  return <PediatricClinicBookingDesktop />;
}

export function PediatricClinicBookingSkeleton(
  props: PediatricClinicBookingSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <PediatricClinicBookingSkeletonMobile />;
  }
  return <PediatricClinicBookingSkeletonDesktop />;
}
