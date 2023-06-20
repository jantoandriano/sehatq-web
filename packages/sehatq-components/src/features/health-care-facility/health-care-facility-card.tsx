import React from "react";
import {
  HealthCareFacilityCardDesktop,
  HealthCareFacilityCardDesktopSkeleton,
  HealthCareFacilityCardGeneralProps,
} from "./health-care-facility-card-desktop";
import {
  HealthCareFacilityCardMobile,
  HealthCareFacilityCardMobileSkeleton,
} from "./health-care-facility-card-mobile";

export type HealthCareFacilityCardProps = {
  isMobile?: boolean;
} & HealthCareFacilityCardGeneralProps;

export function HealthCareFacilityCard(props: HealthCareFacilityCardProps) {
  if (props.isMobile) {
    return <HealthCareFacilityCardMobile {...props} />;
  }
  return <HealthCareFacilityCardDesktop {...props} />;
}

export type HealthCareFacilityCardSkeletonProps = {
  isMobile?: boolean;
};

export function HealthCareFacilityCardSkeleton(
  props: HealthCareFacilityCardSkeletonProps
) {
  if (props.isMobile) {
    return <HealthCareFacilityCardMobileSkeleton />;
  }
  return <HealthCareFacilityCardDesktopSkeleton />;
}
