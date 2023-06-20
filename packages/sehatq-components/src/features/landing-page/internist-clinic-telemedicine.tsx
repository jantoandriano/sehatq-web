import React from "react";

import { InternistClinicTelemedicineDesktop } from "./internist-clinic-telemedicine-desktop";
import { InternistClinicTelemedicineMobile } from "./internist-clinic-telemedicine-mobile";

export type InternistClinicTelemedicineProps = {
  isMobile: boolean;
};

export function InternistClinicTelemedicine(
  props: InternistClinicTelemedicineProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicTelemedicineMobile />;
  }
  return <InternistClinicTelemedicineDesktop />;
}
