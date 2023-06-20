import React from "react";
import { ForumCommentActionsDesktop } from "./forum-comment-actions-desktop";
import { ForumCommentActionsMobile } from "./forum-comment-actions-mobile";

export type ForumCommentActionsProps = {
  isMobile?: boolean;
  forumId: number;
  commentId: number;
  commentBy: string;
  comment: string;
};

export function ForumCommentActions(props: ForumCommentActionsProps) {
  const { isMobile, ...restProps } = props;
  if (isMobile) {
    return <ForumCommentActionsMobile {...restProps} />;
  }
  return <ForumCommentActionsDesktop {...restProps} />;
}
