import React from "react";
import {
  ActivityLinksDesktop,
  ActivityLinksDesktopProps,
} from "./activity-links-desktop";
import {
  ActivityLinksMobile,
  ActivityLinksMobileProps,
} from "./activity-links-mobile";
import { LINKS } from "./activity-links-constants";

export type ActivityLinksProps =
  | ({ isMobile: false } & Omit<ActivityLinksDesktopProps, "links">)
  | ({ isMobile: true } & Omit<ActivityLinksMobileProps, "links">);

export function ActivityLinks(props: ActivityLinksProps) {
  if (props.isMobile) {
    return <ActivityLinksMobile {...props} links={Object.values(LINKS)} />;
  }
  return <ActivityLinksDesktop {...props} links={Object.values(LINKS)} />;
}
