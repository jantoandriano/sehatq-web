import React from "react";
import {
  ForumTagsDesktop,
  ForumTagsDesktopSkeleton,
} from "./forum-tags-desktop";
import { ForumTagsMobile, ForumTagsMobileSkeleton } from "./forum-tags-mobile";

import { ForumCache, useGetForum } from "./forum-queries";

export type ForumTagsProps = {
  isMobile?: boolean;
  forumSlug: string;
};

function selectForumTags(forum: ForumCache) {
  const { tags } = forum.data;
  return { tags };
}

export function ForumTags(props: ForumTagsProps) {
  const { isMobile, forumSlug } = props;

  const {
    data: forumTags,
    isLoading,
    error,
  } = useGetForum({ forumSlug }, { select: selectForumTags });

  if (isLoading) {
    return <ForumTagsSkeleton isMobile={isMobile} />;
  }

  if (error || !forumTags) {
    return null;
  }

  const customProps = { ...forumTags };

  if (isMobile) {
    return <ForumTagsMobile {...customProps} />;
  }

  return <ForumTagsDesktop {...customProps} />;
}

export type ForumTagsSkeletonProps = {
  isMobile?: boolean;
};

export function ForumTagsSkeleton(props: ForumTagsSkeletonProps) {
  if (props.isMobile) {
    return <ForumTagsMobileSkeleton />;
  }

  return <ForumTagsDesktopSkeleton />;
}
