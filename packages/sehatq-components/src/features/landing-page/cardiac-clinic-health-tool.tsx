import React from "react";

import { CardiacClinicHealthToolDesktop } from "./cardiac-clinic-health-tool-desktop";
import { CardiacClinicHealthToolMobile } from "./cardiac-clinic-health-tool-mobile";

export type CardiacClinicHealthToolProps = { isMobile: boolean };
export type CardiacClinicHealthToolSkeletonProps = { isMobile: boolean };

export function CardiacClinicHealthTool(props: CardiacClinicHealthToolProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <CardiacClinicHealthToolMobile />;
  }
  return <CardiacClinicHealthToolDesktop />;
}
