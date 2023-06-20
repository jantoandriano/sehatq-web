import React from "react";

import {
  InternistClinicFastFactDesktop,
  InternistClinicFastFactSkeletonDesktop,
} from "./internist-clinic-fast-fact-desktop";
import {
  InternistClinicFastFactMobile,
  InternistClinicFastFactSkeletonMobile,
} from "./internist-clinic-fast-fact-mobile";

export type InternistClinicFastFactProps = { isMobile: boolean };
export type InternistClinicFastFactSkeletonProps = { isMobile: boolean };

export function InternistClinicFastFact(props: InternistClinicFastFactProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicFastFactMobile />;
  }
  return <InternistClinicFastFactDesktop />;
}

export function InternistClinicFastFactSkeleton(
  props: InternistClinicFastFactSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicFastFactSkeletonMobile />;
  }
  return <InternistClinicFastFactSkeletonDesktop />;
}
