import React from "react";
import {
  ForumCardDesktop,
  ForumCardDesktopProps,
  ForumCardDesktopSkeleton,
} from "./forum-card-desktop";
import {
  ForumCardMobile,
  ForumCardMobileProps,
  ForumCardMobileSkeleton,
} from "./forum-card-mobile";

export type ForumCardProps =
  | ({ isMobile?: false } & ForumCardDesktopProps)
  | ({ isMobile: true } & ForumCardMobileProps);

export type ForumCardSkeletonProps = {
  isMobile?: boolean;
};

export function ForumCard(props: ForumCardProps) {
  const { isMobile, ...otherProps } = props;

  const newProps = {
    ...otherProps,
  };

  if (isMobile) {
    return <ForumCardMobile {...newProps} />;
  }

  return <ForumCardDesktop {...newProps} />;
}

export function ForumCardSkeleton(props: ForumCardSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <ForumCardMobileSkeleton />;

  return <ForumCardDesktopSkeleton />;
}
