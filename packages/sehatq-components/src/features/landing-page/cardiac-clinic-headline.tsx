import React from "react";

import { CardiacClinicHeadlineDesktop } from "./cardiac-clinic-headline-desktop";
import { CardiacClinicHeadlineMobile } from "./cardiac-clinic-headline-mobile";

export type CardiacClinicHeadlineProps = { isMobile: boolean };
export type CardiacClinicHeadlineSkeletonProps = { isMobile: boolean };

export function CardiacClinicHeadline(props: CardiacClinicHeadlineProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <CardiacClinicHeadlineMobile />;
  }
  return <CardiacClinicHeadlineDesktop />;
}
