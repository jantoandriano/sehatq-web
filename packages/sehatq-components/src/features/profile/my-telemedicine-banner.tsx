import React from "react";
import {
  MyTelemedicineBannerDesktop,
  MyTelemedicineBannerDesktopProps,
} from "./my-telemedicine-banner-desktop";
import {
  MyTelemedicineBannerMobile,
  MyTelemedicineBannerMobileProps,
} from "./my-telemedicine-banner-mobile";

export type MyTelemedicineBannerProps =
  | ({ isMobile: false } & MyTelemedicineBannerDesktopProps)
  | ({ isMobile: true } & MyTelemedicineBannerMobileProps);

export function MyTelemedicineBanner(props: MyTelemedicineBannerProps) {
  if (props.isMobile) {
    return <MyTelemedicineBannerMobile {...props} />;
  }
  return <MyTelemedicineBannerDesktop {...props} />;
}
