import React from "react";
import { useGetHCPSEO, HCPSEOCache } from "./health-care-professional-queries";
import { HCPContentDesktop } from "./health-care-professional-content-desktop";
import { HCPContentMobile } from "./health-care-professional-content-mobile";

function selectHCPSEOContent(hcpSEO: HCPSEOCache) {
  return {
    contentTitle: hcpSEO.contentTitle,
    contentDescription: hcpSEO.contentDescription,
  };
}

export type HCPContentProps = {
  isMobile: boolean;
  specialitySlug?: string;
};

export function HCPContent(props: HCPContentProps) {
  const { isMobile, specialitySlug } = props;

  const query = {
    specialitySlug: specialitySlug || "dokter",
  };

  const { data } = useGetHCPSEO(query, { select: selectHCPSEOContent });

  if (!data) {
    return null;
  }

  if (isMobile) {
    return <HCPContentMobile {...data} />;
  }
  return <HCPContentDesktop {...data} />;
}
