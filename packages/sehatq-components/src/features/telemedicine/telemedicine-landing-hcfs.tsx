import React from "react";
import {
  TelemedicineLandingHCFSDesktop,
  TelemedicineLandingHCFSDesktopSkeleton,
} from "./telemedicine-landing-hcfs-desktop";
import {
  TelemedicineLandingHCFSMobile,
  TelemedicineLandingHCFSMobileSkeleton,
} from "./telemedicine-landing-hcfs-mobile";
import {
  TelemedLandingHCFSCache,
  useGetTelemedLandingHCFS,
} from "./telemedicine-landing-hcfs-queries";

export type TelemedicineLandingHCFSProps = {
  isMobile: boolean;
};
function selectHCFS(cache: TelemedLandingHCFSCache) {
  return cache.data;
}
export function TelemedicineLandingHCFS(props: TelemedicineLandingHCFSProps) {
  const { isMobile } = props;

  const { data: hcfs, isLoading } = useGetTelemedLandingHCFS({
    select: selectHCFS,
  });
  if (isLoading) {
    return <TelemedicineLandingHCFSSkeleton isMobile={isMobile} />;
  }

  if (!hcfs) {
    return null;
  }

  if (isMobile) {
    return <TelemedicineLandingHCFSMobile hcfs={hcfs} />;
  }
  return <TelemedicineLandingHCFSDesktop hcfs={hcfs} />;
}

export type TelemedicineLandingHCFSSkeletonProps = {
  isMobile: boolean;
};

export function TelemedicineLandingHCFSSkeleton(
  props: TelemedicineLandingHCFSSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <TelemedicineLandingHCFSMobileSkeleton />;
  }
  return <TelemedicineLandingHCFSDesktopSkeleton />;
}
