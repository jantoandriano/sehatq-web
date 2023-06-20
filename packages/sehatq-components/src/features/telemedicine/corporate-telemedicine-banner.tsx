import React from "react";
import { CorporateTelemedicineBannerMobile } from "./corporate-telemedicine-banner-mobile";
import { CorporateTelemedicineBannerDesktop } from "./corporate-telemedicine-banner-desktop";

export type CorporateTelemedicineBannerProps = {
  isMobile?: boolean;
};

export function CorporateTelemedicineBanner(
  props: CorporateTelemedicineBannerProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <CorporateTelemedicineBannerMobile />;
  }
  return <CorporateTelemedicineBannerDesktop />;
}
