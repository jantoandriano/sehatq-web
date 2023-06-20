import React from "react";
import {
  LinkBubbleDesktop,
  LinkBubbleDesktopProps,
} from "./link-bubble-desktop";
import { LinkBubbleMobile, LinkBubbleMobileProps } from "./link-bubble-mobile";

export type LinkBubbleProps =
  | ({ isMobile: true } & LinkBubbleMobileProps)
  | ({ isMobile: false } & LinkBubbleDesktopProps);

export function LinkBubble(props: LinkBubbleProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <LinkBubbleMobile {...otherProps} />;
  }
  return <LinkBubbleDesktop {...otherProps} />;
}
