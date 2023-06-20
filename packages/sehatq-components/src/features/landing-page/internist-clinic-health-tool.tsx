import React from "react";

import {
  InternistClinicHealthToolDesktop,
  InternistClinicHealthToolSkeletonDesktop,
} from "./internist-clinic-health-tool-desktop";
import {
  InternistClinicHealthToolMobile,
  InternistClinicHealthToolSkeletonMobile,
} from "./internist-clinic-health-tool-mobile";

export type InternistClinicHealthToolProps = { isMobile: boolean };
export type InternistClinicHealthToolSkeletonProps = { isMobile: boolean };

export function InternistClinicHealthTool(
  props: InternistClinicHealthToolProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicHealthToolMobile />;
  }
  return <InternistClinicHealthToolDesktop />;
}

export function InternistClinicHealthToolSkeleton(
  props: InternistClinicHealthToolSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicHealthToolSkeletonMobile />;
  }
  return <InternistClinicHealthToolSkeletonDesktop />;
}
