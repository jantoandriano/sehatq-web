import React from "react";
import {
  HealthCareFacilityHorizontalListDesktop,
  HealthCareFacilityHorizontalListDesktopProps,
  HealthCareFacilityHorizontalListSkeletonDesktop,
} from "./health-care-facility-horizontal-list-desktop";
import {
  HealthCareFacilityHorizontalListMobile,
  HealthCareFacilityHorizontalListMobileProps,
  HealthCareFacilityHorizontalListSkeletonMobile,
} from "./health-care-facility-horizontal-list-mobile";

export type HealthCareFacilityHorizontalListProps =
  | ({ isMobile?: false } & HealthCareFacilityHorizontalListDesktopProps)
  | ({ isMobile: true } & HealthCareFacilityHorizontalListMobileProps);

export function HealthCareFacilityHorizontalList(
  props: HealthCareFacilityHorizontalListProps
) {
  if (props.isMobile) {
    return <HealthCareFacilityHorizontalListMobile {...props} />;
  }
  return <HealthCareFacilityHorizontalListDesktop {...props} />;
}

export type HealthCareFacilityHorizontalListSkeletonProps = {
  isMobile?: boolean;
};

export function HealthCareFacilityHorizontalListSkeleton(
  props: HealthCareFacilityHorizontalListSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <HealthCareFacilityHorizontalListSkeletonMobile />;

  return <HealthCareFacilityHorizontalListSkeletonDesktop />;
}
