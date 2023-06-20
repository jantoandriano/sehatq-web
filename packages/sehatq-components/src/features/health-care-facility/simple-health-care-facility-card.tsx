import React from "react";
import {
  SimpleHealthCareFacilityCardDesktop,
  SimpleHealthCareFacilityCardDesktopProps,
  SimpleHealthCareFacilityCardSkeletonDesktop,
} from "./simple-health-care-facility-card-desktop";
import {
  SimpleHealthCareFacilityCardMobile,
  SimpleHealthCareFacilityCardMobileProps,
  SimpleHealthCareFacilityCardSkeletonMobile,
} from "./simple-health-care-facility-card-mobile";

export type SimpleHealthCareFacilityCardProps =
  | ({ isMobile: false } & SimpleHealthCareFacilityCardDesktopProps)
  | ({ isMobile: true } & SimpleHealthCareFacilityCardMobileProps);

export function SimpleHealthCareFacilityCard(
  props: SimpleHealthCareFacilityCardProps
) {
  if (props.isMobile) {
    return <SimpleHealthCareFacilityCardMobile {...props} />;
  }
  return <SimpleHealthCareFacilityCardDesktop {...props} />;
}

export type SimpleHealthCareFacilityCardSkeletonProps = {
  isMobile?: boolean;
};

export function SimpleHealthCareFacilityCardSkeleton(
  props: SimpleHealthCareFacilityCardSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <SimpleHealthCareFacilityCardSkeletonMobile />;

  return <SimpleHealthCareFacilityCardSkeletonDesktop />;
}
