import React from "react";

import {
  InternistClinicHeadlineDesktop,
  InternistClinicHeadlineSkeletonDesktop,
} from "./internist-clinic-headline-desktop";
import {
  InternistClinicHeadlineMobile,
  InternistClinicHeadlineSkeletonMobile,
} from "./internist-clinic-headline-mobile";

export type InternistClinicHeadlineProps = { isMobile: boolean };
export type InternistClinicHeadlineSkeletonProps = { isMobile: boolean };

export function InternistClinicHeadline(props: InternistClinicHeadlineProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicHeadlineMobile />;
  }
  return <InternistClinicHeadlineDesktop />;
}

export function InternistClinicHeadlineSkeleton(
  props: InternistClinicHeadlineSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicHeadlineSkeletonMobile />;
  }
  return <InternistClinicHeadlineSkeletonDesktop />;
}
