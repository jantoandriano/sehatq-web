import React from "react";
import {
  HealthCareProfessionalHorizontalListDesktop,
  HealthCareProfessionalHorizontalListDesktopProps,
} from "./health-care-professional-horizontal-list-desktop";
import {
  HealthCareProfessionalHorizontalListMobile,
  HealthCareProfessionalHorizontalListMobileProps,
} from "./health-care-professional-horizontal-list-mobile";

export type HealthCareProfessionalHorizontalListProps =
  | ({
      isMobile: true;
    } & HealthCareProfessionalHorizontalListMobileProps)
  | ({
      isMobile?: false;
    } & HealthCareProfessionalHorizontalListDesktopProps);

export function HealthCareProfessionalHorizontalList(
  props: HealthCareProfessionalHorizontalListProps
) {
  const { isMobile, isLoading, professionalHealthCares } = props;

  const otherProps = {
    isLoading,
    professionalHealthCares,
  };
  if (isMobile) {
    return <HealthCareProfessionalHorizontalListMobile {...otherProps} />;
  }

  return <HealthCareProfessionalHorizontalListDesktop {...otherProps} />;
}
