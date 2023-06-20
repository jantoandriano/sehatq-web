import React from "react";
import {
  MessageTimeDesktop,
  MessageTimeDesktopProps,
  MessageTimeDesktopSkeleton,
} from "./message-time-desktop";
import {
  MessageTimeMobile,
  MessageTimeMobileProps,
  MessageTimeMobileSkeleton,
} from "./message-time-mobile";

export type MessageTimeProps =
  | ({ isMobile: true } & MessageTimeMobileProps)
  | ({ isMobile: false } & MessageTimeDesktopProps);

export function MessageTime(props: MessageTimeProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <MessageTimeMobile {...otherProps} />;
  }

  return <MessageTimeDesktop {...otherProps} />;
}

export type MessageTimeSkeletonProps = {
  isMobile?: boolean;
};

export function MessageTimeSkeleton(props: MessageTimeSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <MessageTimeMobileSkeleton />;

  return <MessageTimeDesktopSkeleton />;
}
