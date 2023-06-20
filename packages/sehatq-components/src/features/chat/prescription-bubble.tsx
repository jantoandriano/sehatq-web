import React from "react";
import {
  PrescriptionBubbleDesktop,
  PrescriptionBubbleDesktopProps,
} from "./prescription-bubble-desktop";
import {
  PrescriptionBubbleMobile,
  PrescriptionBubbleMobileProps,
} from "./prescription-bubble-mobile";

export type PrescriptionBubbleProps =
  | ({ isMobile: true } & PrescriptionBubbleMobileProps)
  | ({ isMobile: false } & PrescriptionBubbleDesktopProps);

export function PrescriptionBubble(props: PrescriptionBubbleProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <PrescriptionBubbleMobile {...otherProps} />;
  }
  return <PrescriptionBubbleDesktop {...otherProps} />;
}
