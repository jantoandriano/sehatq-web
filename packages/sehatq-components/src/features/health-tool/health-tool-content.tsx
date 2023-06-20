import React from "react";

import { HealthToolContentMobile } from "./health-tool-content-mobile";
import { HealthToolContentDesktop } from "./health-tool-content-desktop";
import { useGetHealthToolSEO, HealthToolSEOCache } from "./health-tool-queries";

export type HealthToolContentProps = {
  isMobile?: boolean;
  slug: string;
};

function selectAccordions(cache: HealthToolSEOCache) {
  return cache.accordions;
}

export function HealthToolContent(props: HealthToolContentProps) {
  const { data = [] } = useGetHealthToolSEO(
    { slug: props.slug },
    { select: selectAccordions }
  );
  if (props.isMobile) {
    return <HealthToolContentMobile contents={data} />;
  }
  return <HealthToolContentDesktop contents={data} />;
}
