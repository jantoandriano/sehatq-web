import React from "react";
import { SendbirdTypingIndicatorDesktop } from "./sendbird-typing-indicator-desktop";
import { SendbirdTypingIndicatorMobile } from "./sendbird-typing-indicator-mobile";

export type SendbirdTypingIndicatorProps = {
  isMobile?: boolean;
};

export function SendbirdTypingIndicator(props: SendbirdTypingIndicatorProps) {
  if (props.isMobile) {
    return <SendbirdTypingIndicatorMobile />;
  }
  return <SendbirdTypingIndicatorDesktop />;
}
