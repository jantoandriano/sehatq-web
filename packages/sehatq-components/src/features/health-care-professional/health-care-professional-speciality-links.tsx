import React from "react";
import {
  SpecialityLinkCache,
  useGetSpecialityLink,
} from "./health-care-professional-speciality-queries";
import { HealthCareProfessionalSpecialityLinksDesktop } from "./health-care-professional-speciality-links-desktop";
import { HealthCareProfessionalSpecialityLinksMobile } from "./health-care-professional-speciality-links-mobile";

export type HealthCareProfessionalSpecialityLinksProps = {
  isMobile: boolean;
};

function selectSpecialityLink(articleCategories: SpecialityLinkCache) {
  return articleCategories.data;
}

export function HealthCareProfessionalSpecialityLinks(
  props: HealthCareProfessionalSpecialityLinksProps
) {
  const { isMobile } = props;

  const { data: specialityLink } = useGetSpecialityLink({
    select: selectSpecialityLink,
  });

  if (!specialityLink) {
    return null;
  }

  const otherProps = { specialityLink };

  if (isMobile) {
    return <HealthCareProfessionalSpecialityLinksMobile {...otherProps} />;
  }

  return <HealthCareProfessionalSpecialityLinksDesktop {...otherProps} />;
}
