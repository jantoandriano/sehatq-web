import React from "react";
import { EmptyHealthCareFacilityListDesktop } from "./empty-health-care-facility-list-desktop";
import { EmptyHealthCareFacilityListMobile } from "./empty-health-care-facility-list-mobile";

export type EmptyHealthCareFacilityListProps = {
  isMobile?: boolean;
};

export function EmptyHealthCareFacilityList(
  props: EmptyHealthCareFacilityListProps
) {
  if (props.isMobile) {
    return <EmptyHealthCareFacilityListMobile />;
  }
  return <EmptyHealthCareFacilityListDesktop />;
}
