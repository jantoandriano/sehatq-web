import React from "react";

import {
  ConsultationDurationInfoDesktop,
  ConsultationDurationInfoDesktopProps,
  ConsultationDurationInfoDesktopSkeleton,
} from "./consultation-duration-info-desktop";

import {
  ConsultationDurationInfoMobile,
  ConsultationDurationInfoMobileProps,
  ConsultationDurationInfoMobileSkeleton,
} from "./consultation-duration-info-mobile";

export type ConsultationDurationInfoProps =
  | ({ isMobile: false } & ConsultationDurationInfoDesktopProps)
  | ({ isMobile: true } & ConsultationDurationInfoMobileProps);

export type ConsultationDurationInfoSkeletonProps = {
  isMobile?: boolean;
};

export function ConsultationDurationInfo(props: ConsultationDurationInfoProps) {
  if (props.isMobile) {
    return <ConsultationDurationInfoMobile {...props} />;
  }
  return <ConsultationDurationInfoDesktop {...props} />;
}

export function ConsultationDurationInfoSkeleton(
  props: ConsultationDurationInfoSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <ConsultationDurationInfoMobileSkeleton />;
  return <ConsultationDurationInfoDesktopSkeleton />;
}
