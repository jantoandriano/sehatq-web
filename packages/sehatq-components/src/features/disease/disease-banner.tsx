import React from "react";
import {
  DiseaseBannerDesktop,
  DiseaseBannerDesktopProps,
  DiseaseBannerSkeletonDesktop,
} from "./disease-banner-desktop";
import {
  DiseaseBannerMobile,
  DiseaseBannerMobileProps,
  DiseaseBannerSkeletonMobile,
} from "./disease-banner-mobile";

export type DiseaseBannerProps =
  | ({ isMobile: false } & DiseaseBannerDesktopProps)
  | ({ isMobile: true } & DiseaseBannerMobileProps);

export type DiseaseBannerSkeletonProps = { isMobile: boolean };

export function DiseaseBanner(props: DiseaseBannerProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <DiseaseBannerMobile {...props} />;
  }
  return <DiseaseBannerDesktop {...props} />;
}

export function DiseaseBannerSkeleton(props: DiseaseBannerSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <DiseaseBannerSkeletonMobile />;
  }
  return <DiseaseBannerSkeletonDesktop />;
}
