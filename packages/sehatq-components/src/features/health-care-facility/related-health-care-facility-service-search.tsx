import React from "react";
import {
  RelatedHealthCareFacilityServiceSearchDesktop,
  RelatedHealthCareFacilityServiceSearchDesktopSkeleton,
  RelatedHealthCareFacilityServiceSearchGeneralProps,
} from "./related-health-care-facility-service-search-desktop";
import {
  RelatedHealthCareFacilityServiceSearchMobile,
  RelatedHealthCareFacilityServiceSearchMobileSkeleton,
} from "./related-health-care-facility-service-search-mobile";

export type RelatedHealthCareFacilityServiceSearchProps = {
  isMobile?: boolean;
} & RelatedHealthCareFacilityServiceSearchGeneralProps;

export function RelatedHealthCareFacilityServiceSearch(
  props: RelatedHealthCareFacilityServiceSearchProps
) {
  if (props.isMobile) {
    return <RelatedHealthCareFacilityServiceSearchMobile {...props} />;
  }
  return <RelatedHealthCareFacilityServiceSearchDesktop {...props} />;
}

export function RelatedHealthCareFacilityServiceSearchSkeleton(props: {
  isMobile?: boolean;
}) {
  if (props.isMobile) {
    return <RelatedHealthCareFacilityServiceSearchMobileSkeleton />;
  }
  return <RelatedHealthCareFacilityServiceSearchDesktopSkeleton />;
}
