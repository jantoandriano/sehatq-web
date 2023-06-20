import { useRouter } from "next/router";
import React from "react";

import { HealthToolLandingDesktop } from "./health-tool-landing-desktop";
import { HealthToolLandingMobile } from "./health-tool-landing-mobile";

interface Props {
  isMobile: boolean;
}

export function HealthToolLanding({ isMobile }: Props) {
  const { query } = useRouter();

  const props = {
    userId: `${query?.userId || ""}`,
  };

  if (isMobile) {
    return <HealthToolLandingMobile {...props} />;
  }
  return <HealthToolLandingDesktop {...props} />;
}
