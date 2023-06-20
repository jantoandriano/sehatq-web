import React, { useState } from "react";

import { UnavailableHealthCareFacilityBookingInfoDesktop } from "./unavailable-healthcare-facility-booking-desktop";
import { UnavailableHealthCareFacilityBookingInfoMobile } from "./unavailable-healthcare-facility-booking-mobile";

export type UnavailableHealthCareFacilityBookingInfoProps = {
  isMobile: boolean;
};

export function UnavailableHealthCareFacilityBookingInfo({
  isMobile,
}: UnavailableHealthCareFacilityBookingInfoProps) {
  const [showPopupUnavailable, setShowPopupUnavailable] =
    useState<boolean>(false);

  const toggleModalUnavaialable = () =>
    setShowPopupUnavailable(!showPopupUnavailable);

  if (isMobile) {
    return (
      <UnavailableHealthCareFacilityBookingInfoMobile
        isOpen={showPopupUnavailable}
        toggleModalUnavaialable={toggleModalUnavaialable}
      />
    );
  }

  return <UnavailableHealthCareFacilityBookingInfoDesktop />;
}
