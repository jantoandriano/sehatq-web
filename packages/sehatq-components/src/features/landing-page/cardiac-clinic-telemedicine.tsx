import React from "react";

import { CardiacClinicTelemedicineDesktop } from "./cardiac-clinic-telemedicine-desktop";
import { CardiacClinicTelemedicineMobile } from "./cardiac-clinic-telemedicine-mobile";

export type CardiacClinicTelemedicineProps = {
  isMobile: boolean;
};

export function CardiacClinicTelemedicine(
  props: CardiacClinicTelemedicineProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <CardiacClinicTelemedicineMobile />;
  }
  return <CardiacClinicTelemedicineDesktop />;
}
