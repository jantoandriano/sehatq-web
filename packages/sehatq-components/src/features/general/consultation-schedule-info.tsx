import React from "react";
import {
  ConsultationScheduleInfoDesktop,
  ConsultationScheduleInfoDesktopProps,
  ConsultationScheduleInfoDesktopSkeleton,
} from "./consultation-schedule-info-desktop";
import {
  ConsultationScheduleInfoMobile,
  ConsultationScheduleInfoMobileProps,
  ConsultationScheduleInfoMobileSkeleton,
} from "./consultation-schedule-info-mobile";

export type ConsultationScheduleInfoProps =
  | ({ isMobile: false } & ConsultationScheduleInfoDesktopProps)
  | ({ isMobile: true } & ConsultationScheduleInfoMobileProps);

export type ConsultationScheduleInfoSkeletonProps = {
  isMobile?: boolean;
};

export function ConsultationScheduleInfo(props: ConsultationScheduleInfoProps) {
  if (props.isMobile) {
    return <ConsultationScheduleInfoMobile {...props} />;
  }
  return <ConsultationScheduleInfoDesktop {...props} />;
}

export function ConsultationScheduleInfoSkeleton(
  props: ConsultationScheduleInfoSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <ConsultationScheduleInfoMobileSkeleton />;

  return <ConsultationScheduleInfoDesktopSkeleton />;
}
