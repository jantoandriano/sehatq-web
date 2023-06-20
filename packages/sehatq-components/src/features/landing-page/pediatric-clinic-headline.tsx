import React from "react";

import {
  PediatricClinicHeadlineDesktop,
  PediatricClinicHeadlineSkeletonDesktop,
} from "./pediatric-clinic-headline-desktop";
import {
  PediatricClinicHeadlineMobile,
  PediatricClinicHeadlineSkeletonMobile,
} from "./pediatric-clinic-headline-mobile";

export type PediatricClinicHeadlineProps = { isMobile: boolean };
export type PediatricClinicHeadlineSkeletonProps = { isMobile: boolean };

export function PediatricClinicHeadline(props: PediatricClinicHeadlineProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <PediatricClinicHeadlineMobile />;
  }
  return <PediatricClinicHeadlineDesktop />;
}

export function PediatricClinicHeadlineSkeleton(
  props: PediatricClinicHeadlineSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <PediatricClinicHeadlineSkeletonMobile />;
  }
  return <PediatricClinicHeadlineSkeletonDesktop />;
}
