import React from "react";
import { ChatEndedBubbleDesktop } from "./chat-ended-bubble-desktop";
import { ChatEndedBubbleMobile } from "./chat-ended-bubble-mobile";

export type ChatEndedBubbleProps = {
  isMobile?: boolean;
  endedBy: string;
};

export function ChatEndedBubble(props: ChatEndedBubbleProps) {
  if (props.isMobile) {
    return <ChatEndedBubbleMobile endedBy={props.endedBy} />;
  }

  return <ChatEndedBubbleDesktop endedBy={props.endedBy} />;
}
