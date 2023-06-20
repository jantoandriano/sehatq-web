import React from "react";

import { HealthToolListContentMobile } from "./health-tool-list-content-mobile";
import { HealthToolListContentDesktop } from "./health-tool-list-content-desktop";
import { useGetHealthToolSEO, HealthToolSEOCache } from "./health-tool-queries";

export type HealthToolListContentProps = {
  isMobile?: boolean;
};

function selectAccordions(cache: HealthToolSEOCache) {
  return cache.accordions;
}

export function HealthToolListContent(props: HealthToolListContentProps) {
  const { data = [] } = useGetHealthToolSEO(
    { slug: "tes-kesehatan" },
    { select: selectAccordions }
  );
  if (props.isMobile) {
    return <HealthToolListContentMobile contents={data} />;
  }
  return <HealthToolListContentDesktop contents={data} />;
}
