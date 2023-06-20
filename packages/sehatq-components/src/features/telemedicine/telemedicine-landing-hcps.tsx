import React from "react";
import {
  TelemedicineLandingHCPSDesktop,
  TelemedicineLandingHCPSDesktopSkeleton,
} from "./telemedicine-landing-hcps-desktop";
import {
  TelemedicineLandingHCPSMobile,
  TelemedicineLandingHCPSMobileSkeleton,
} from "./telemedicine-landing-hcps-mobile";
import {
  TelemedLandingHCPSCache,
  useGetTelemedLandingHCPS,
} from "./telemedicine-landing-hcps-queries";

export type TelemedicineLandingHCPSProps = {
  isMobile: boolean;
};

function selectHCPS(cache: TelemedLandingHCPSCache) {
  return cache.data;
}
export function TelemedicineLandingHCPS(props: TelemedicineLandingHCPSProps) {
  const { isMobile } = props;

  const { data: hcps, isLoading } = useGetTelemedLandingHCPS({
    select: selectHCPS,
  });

  if (isLoading) {
    return <TelemedicineLandingHCPSSkeleton isMobile={isMobile} />;
  }

  if (!hcps) {
    return null;
  }

  if (isMobile) {
    return <TelemedicineLandingHCPSMobile hcps={hcps.slice(0, 5)} />;
  }

  return <TelemedicineLandingHCPSDesktop hcps={hcps.slice(0, 5)} />;
}

export type TelemedicineLandingHCPSSkeletonProps = {
  isMobile: boolean;
};

export function TelemedicineLandingHCPSSkeleton(
  props: TelemedicineLandingHCPSSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <TelemedicineLandingHCPSMobileSkeleton />;
  }

  return <TelemedicineLandingHCPSDesktopSkeleton />;
}
