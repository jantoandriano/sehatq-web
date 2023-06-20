import { formatDate, parseToDate } from "@sehatq/utils";
import React from "react";
import {
  ForumCommentReplyDesktop,
  ForumCommentReplyDesktopProps,
  ForumCommentReplyDesktopSkeleton,
} from "./forum-comment-reply-desktop";
import {
  ForumCommentReplyMobile,
  ForumCommentReplyMobileProps,
  ForumCommentReplyMobileSkeleton,
} from "./forum-comment-reply-mobile";

export type ForumCommentReplyProps =
  | ({
      isMobile: false;
    } & ForumCommentReplyDesktopProps)
  | ({ isMobile: true } & ForumCommentReplyMobileProps);

export function ForumCommentReply(props: ForumCommentReplyProps) {
  const created = parseToDate(props.createdAt, "yyyy-MM-dd HH:mm:ss");
  const customProps = {
    ...props,
    createdAt: formatDate(created, "dd MMM yyyy',' HH:mm:ss", true),
  };

  if (props.isMobile) {
    return <ForumCommentReplyMobile {...customProps} />;
  }

  return <ForumCommentReplyDesktop {...customProps} />;
}

export type ForumCommentReplySkeletonProps = {
  isMobile?: boolean;
};

export function ForumCommentReplySkeleton(
  props: ForumCommentReplySkeletonProps
) {
  if (props.isMobile) {
    return <ForumCommentReplyMobileSkeleton />;
  }

  return <ForumCommentReplyDesktopSkeleton />;
}
