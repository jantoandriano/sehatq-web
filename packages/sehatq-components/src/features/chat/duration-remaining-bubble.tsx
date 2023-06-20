import React from "react";
import { DurationRemainingBubbleDesktop } from "./duration-remaining-bubble-desktop";
import { DurationRemainingBubbleMobile } from "./duration-remaining-bubble-mobile";

export type DurationRemainingBubbleProps = {
  isMobile?: boolean;
  messageText?: string;
};

export function DurationRemainingBubble(props: DurationRemainingBubbleProps) {
  if (props.isMobile) {
    return <DurationRemainingBubbleMobile message={props.messageText} />;
  }

  return <DurationRemainingBubbleDesktop message={props.messageText} />;
}
