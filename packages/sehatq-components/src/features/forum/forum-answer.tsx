import React from "react";
import {
  ForumAnswerDesktop,
  ForumAnswerDesktopSkeleton,
} from "./forum-answer-desktop";
import {
  ForumAnswerMobile,
  ForumAnswerMobileSkeleton,
} from "./forum-answer-mobile";

import { ForumCache, useGetForum } from "./forum-queries";
import { ForumRatingCache, useGetForumRating } from "./forum-rating-queries";

export type ForumAnswerProps = {
  isMobile?: boolean;
  forumSlug: string;
  forumId: number;
};

function selectData(forumRating: ForumRatingCache) {
  return forumRating.data;
}

function selectForumAnswer(forum: ForumCache) {
  const { id, answer, answeredBy, doctorAuthorSlug } = forum.data;
  return { id, answer, answeredBy, doctorAuthorSlug };
}

export function ForumAnswer(props: ForumAnswerProps) {
  const { isMobile, forumSlug, forumId } = props;

  const {
    data: forumAnswer,
    isLoading,
    error,
  } = useGetForum({ forumSlug }, { select: selectForumAnswer });

  const { data: forumRating } = useGetForumRating(
    { forumId: `${forumId}` },
    { select: selectData }
  );

  if (isLoading) {
    return <ForumAnswerSkeleton isMobile={isMobile} />;
  }

  if (error || !forumAnswer) {
    return null;
  }

  const customProps = {
    ...forumAnswer,
    rating: forumRating,
  };

  if (isMobile) {
    return <ForumAnswerMobile {...customProps} />;
  }

  return <ForumAnswerDesktop {...customProps} />;
}

export type ForumAnswerSkeletonProps = {
  isMobile?: boolean;
};

export function ForumAnswerSkeleton(props: ForumAnswerSkeletonProps) {
  if (props.isMobile) {
    return <ForumAnswerMobileSkeleton />;
  }

  return <ForumAnswerDesktopSkeleton />;
}
