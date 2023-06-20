import React from "react";
import {
  VideoCallBubbleDesktop,
  VideoCallBubbleDesktopProps,
} from "./video-call-bubble-desktop";
import {
  VideoCallBubbleMobile,
  VideoCallBubbleMobileProps,
} from "./video-call-bubble-mobile";

export type VideoCallBubbleProps =
  | ({ isMobile: true } & VideoCallBubbleMobileProps)
  | ({ isMobile: false } & VideoCallBubbleDesktopProps);

export function VideoCallBubble(props: VideoCallBubbleProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <VideoCallBubbleMobile {...otherProps} />;
  }
  return <VideoCallBubbleDesktop {...otherProps} />;
}
