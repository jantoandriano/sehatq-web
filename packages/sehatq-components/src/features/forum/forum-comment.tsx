import { formatDate, parseToDate } from "@sehatq/utils";
import React from "react";
import {
  ForumCommentDesktop,
  ForumCommentDesktopProps,
  ForumCommentDesktopSkeleton,
} from "./forum-comment-desktop";
import {
  ForumCommentMobile,
  ForumCommentMobileProps,
  ForumCommentMobileSkeleton,
} from "./forum-comment-mobile";

export type ForumCommentProps =
  | ({
      isMobile: false;
    } & ForumCommentDesktopProps)
  | ({ isMobile: true } & ForumCommentMobileProps);

export function ForumComment(props: ForumCommentProps) {
  const created = parseToDate(props.createdAt, "yyyy-MM-dd HH:mm:ss");
  const customProps = {
    ...props,
    createdAt: formatDate(created, "dd MMM yyyy',' HH:mm:ss", true),
  };

  if (props.isMobile) {
    return <ForumCommentMobile {...customProps} />;
  }

  return <ForumCommentDesktop {...customProps} />;
}

export type ForumCommentSkeletonProps = {
  isMobile?: boolean;
};

export function ForumCommentSkeleton(props: ForumCommentSkeletonProps) {
  if (props.isMobile) {
    return <ForumCommentMobileSkeleton />;
  }

  return <ForumCommentDesktopSkeleton />;
}
