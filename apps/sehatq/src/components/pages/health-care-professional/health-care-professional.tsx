import { useRouter } from "next/router";
import React from "react";
import { HealthCareProfessionalDesktop } from "./health-care-professional-desktop";
import { HealthCareProfessionalMobile } from "./health-care-professional-mobile";

export type HealthCareProfessionalProps = {
  isMobile: boolean;
};
export function HealthCareProfessional(props: HealthCareProfessionalProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { hcpSlug, hcfId, date } = router.query;

  const otherProps = {
    isMobile,
    hcpSlug: (hcpSlug as string) ?? "",
    hcfId: hcfId as string,
    date: date as string,
  };

  if (isMobile) {
    return <HealthCareProfessionalMobile {...otherProps} />;
  }

  return <HealthCareProfessionalDesktop {...otherProps} />;
}
