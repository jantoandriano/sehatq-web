import React from "react";
import {
  ChatSkeletonDesktop,
  ChatSkeletonDesktopProps,
} from "./chat-skeleton-desktop";
import {
  ChatSkeletonMobile,
  ChatSkeletonMobileProps,
} from "./chat-skeleton-mobile";

export type ChatSkeletonProps =
  | ({ isMobile: true } & ChatSkeletonMobileProps)
  | ({ isMobile?: false } & ChatSkeletonDesktopProps);

export function ChatSkeleton(props: ChatSkeletonProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <ChatSkeletonMobile {...otherProps} />;
  }
  return <ChatSkeletonDesktop {...otherProps} />;
}
