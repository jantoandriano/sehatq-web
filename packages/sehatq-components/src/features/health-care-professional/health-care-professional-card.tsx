import React from "react";
import {
  HealthCareProfessionalCardDesktop,
  HealthCareProfessionalCardDesktopProps,
  HealthCareProfessionalCardDesktopSkeleton,
} from "./health-care-professional-card-desktop";
import {
  HealthCareProfessionalCardMobile,
  HealthCareProfessionalCardMobileProps,
  HealthCareProfessionalCardMobileSkeleton,
} from "./health-care-professional-card-mobile";
export type HealthCareProfessionalCardProps =
  | ({
      isMobile: true;
    } & HealthCareProfessionalCardMobileProps)
  | ({ isMobile: false } & HealthCareProfessionalCardDesktopProps);

export function HealthCareProfessionalCard(
  props: HealthCareProfessionalCardProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <HealthCareProfessionalCardMobile {...props} />;
  }
  return <HealthCareProfessionalCardDesktop {...props} />;
}

export type HealthCareProfessionalCardSkeletonProps = {
  isMobile: boolean;
};

export function HealthCareProfessionalCardSkeleton(
  props: HealthCareProfessionalCardSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <HealthCareProfessionalCardMobileSkeleton />;
  }
  return <HealthCareProfessionalCardDesktopSkeleton />;
}
