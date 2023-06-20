import React from "react";
import {
  TextBubbleDesktop,
  TextBubbleDesktopProps,
} from "./text-bubble-desktop";
import { TextBubbleMobile, TextBubbleMobileProps } from "./text-bubble-mobile";

export type TextBubbleProps =
  | ({ isMobile: true } & TextBubbleMobileProps)
  | ({ isMobile: false } & TextBubbleDesktopProps);

export function TextBubble(props: TextBubbleProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <TextBubbleMobile {...otherProps} />;
  }
  return <TextBubbleDesktop {...otherProps} />;
}
