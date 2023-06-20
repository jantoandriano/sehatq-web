import React from "react";

import { HealthToolListMobile } from "./health-tool-list-mobile";
import { HealthToolListDesktop } from "./health-tool-list-desktop";

export type HealthToolListProps = {
  isMobile: boolean;
};

export function HealthToolListPage(props: HealthToolListProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <HealthToolListMobile />;
  }
  return <HealthToolListDesktop />;
}
