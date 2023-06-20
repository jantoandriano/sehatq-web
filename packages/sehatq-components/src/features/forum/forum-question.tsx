import React from "react";
import {
  ForumQuestionDesktop,
  ForumQuestionDesktopSkeleton,
} from "./forum-question-desktop";
import {
  ForumQuestionMobile,
  ForumQuestionMobileSkeleton,
} from "./forum-question-mobile";

import { ForumCache, useGetForum } from "./forum-queries";

export type ForumQuestionProps = {
  isMobile?: boolean;
  forumSlug: string;
};

function selectForumQuestion(forum: ForumCache) {
  const {
    id,
    date,
    category,
    title,
    question,
    user,
    viewsCount,
    commentsCount,
    shareUrl,
  } = forum.data;
  return {
    id,
    date,
    category,
    title,
    question,
    user,
    viewsCount,
    commentsCount,
    shareUrl,
  };
}

export function ForumQuestion(props: ForumQuestionProps) {
  const { isMobile, forumSlug } = props;

  const {
    data: forumQuestion,
    isLoading,
    error,
  } = useGetForum({ forumSlug }, { select: selectForumQuestion });

  if (isLoading) {
    return <ForumQuestionSkeleton isMobile={isMobile} />;
  }

  if (error || !forumQuestion) {
    return null;
  }

  const customProps = {
    ...forumQuestion,
  };

  if (isMobile) {
    return <ForumQuestionMobile {...customProps} />;
  }

  return <ForumQuestionDesktop {...customProps} />;
}

export type ForumQuestionSkeletonProps = {
  isMobile?: boolean;
};

export function ForumQuestionSkeleton(props: ForumQuestionSkeletonProps) {
  if (props.isMobile) {
    return <ForumQuestionMobileSkeleton />;
  }

  return <ForumQuestionDesktopSkeleton />;
}
