import React from "react";
import {
  SimpleForumCardDesktop,
  SimpleForumCardDesktopProps,
  SimpleForumCardDesktopSkeleton,
} from "./simple-forum-card-desktop";
import {
  SimpleForumCardMobile,
  SimpleForumCardMobileProps,
  SimpleForumCardMobileSkeleton,
} from "./simple-forum-card-mobile";

export type SimpleForumCardProps =
  | ({ isMobile: false } & SimpleForumCardDesktopProps)
  | ({ isMobile: true } & SimpleForumCardMobileProps);

export type SimpleForumCardSkeletonProps = {
  isMobile?: boolean;
};

export function SimpleForumCard(props: SimpleForumCardProps) {
  if (props.isMobile) {
    return <SimpleForumCardMobile {...props} />;
  }
  return <SimpleForumCardDesktop {...props} />;
}

export function SimpleForumCardSkeleton(props: SimpleForumCardSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <SimpleForumCardMobileSkeleton />;

  return <SimpleForumCardDesktopSkeleton />;
}
