import React from "react";

import { PediatricClinicTelemedicineDesktop } from "./pediatric-clinic-telemedicine-desktop";
import { PediatricClinicTelemedicineMobile } from "./pediatric-clinic-telemedicine-mobile";

export type PediatricClinicTelemedicineProps = {
  isMobile: boolean;
};

export function PediatricClinicTelemedicine(
  props: PediatricClinicTelemedicineProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <PediatricClinicTelemedicineMobile />;
  }
  return <PediatricClinicTelemedicineDesktop />;
}
