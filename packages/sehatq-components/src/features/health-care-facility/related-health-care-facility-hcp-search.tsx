import React from "react";
import {
  RelatedHealthCareFacilityHCPSearchDesktop,
  RelatedHealthCareFacilityHCPSearchDesktopSkeleton,
  RelatedHealthCareFacilityHCPSearchGeneralProps,
} from "./related-health-care-facility-hcp-search-desktop";
import {
  RelatedHealthCareFacilityHCPSearchMobile,
  RelatedHealthCareFacilityHCPSearchMobileSkeleton,
} from "./related-health-care-facility-hcp-search-mobile";

export type RelatedHealthCareFacilityHCPSearchProps = {
  isMobile?: boolean;
} & RelatedHealthCareFacilityHCPSearchGeneralProps;

export function RelatedHealthCareFacilityHCPSearch(
  props: RelatedHealthCareFacilityHCPSearchProps
) {
  if (props.isMobile) {
    return <RelatedHealthCareFacilityHCPSearchMobile {...props} />;
  }
  return <RelatedHealthCareFacilityHCPSearchDesktop {...props} />;
}

export function RelatedHealthCareFacilityHCPSearchSkeleton(props: {
  isMobile?: boolean;
}) {
  if (props.isMobile) {
    return <RelatedHealthCareFacilityHCPSearchMobileSkeleton />;
  }
  return <RelatedHealthCareFacilityHCPSearchDesktopSkeleton />;
}
