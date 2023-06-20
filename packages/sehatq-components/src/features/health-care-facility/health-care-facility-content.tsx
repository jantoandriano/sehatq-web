import React from "react";
import { useGetHCFSEO, HCFSEOCache } from "./health-care-facility-queries";
import { HCFContentDesktop } from "./health-care-facility-content-desktop";
import { HCFContentMobile } from "./health-care-facility-content-mobile";

function selectHCFSEOContent(cache: HCFSEOCache) {
  return {
    contentTitle: cache.contentTitle,
    contentDescription: cache.contentDescription,
  };
}

export type HCFContentProps = {
  isMobile: boolean;
  hcfTypeSlug?: string;
};

export function HCFContent(props: HCFContentProps) {
  const query = {
    hcfTypeSlug: props.hcfTypeSlug ?? "",
  };

  const { data } = useGetHCFSEO(query, { select: selectHCFSEOContent });

  if (!data) {
    return null;
  }

  if (props.isMobile) {
    return <HCFContentMobile {...data} />;
  }
  return <HCFContentDesktop {...data} />;
}
