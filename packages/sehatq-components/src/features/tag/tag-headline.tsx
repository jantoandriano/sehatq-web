import React from "react";
import { slugToName } from "@sehatq/utils";
import {
  TagHeadlineDesktop,
  TagHeadlineDesktopSkeleton,
} from "./tag-headline-desktop";
import {
  TagHeadlineMobile,
  TagHeadlineMobileSkeleton,
} from "./tag-headline-mobile";
import { TagSEOCache, useGetTagSEO } from "./tag-seo-queries";

export type TagHeadlineProps = {
  isMobile: boolean;
  tagSlug: string;
};

export type TagHeadlineSkeletonProps = {
  isMobile?: boolean;
};

function selectTagSEOContent(tagSEO: TagSEOCache) {
  return {
    description: tagSEO.metaDescription,
  };
}

export function TagHeadline(props: TagHeadlineProps) {
  const { isMobile, tagSlug } = props;

  const query = {
    tagSlug,
  };

  const { data: tag, isLoading } = useGetTagSEO(query, {
    select: selectTagSEOContent,
  });

  const TagHeadlineProps = {
    title: slugToName(tagSlug),
    description: tag?.description ?? "",
  };

  if (isLoading) {
    return <TagHeadlineSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <TagHeadlineMobile {...TagHeadlineProps} />;
  }

  return <TagHeadlineDesktop {...TagHeadlineProps} />;
}

export function TagHeadlineSkeleton(props: TagHeadlineSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <TagHeadlineMobileSkeleton />;

  return <TagHeadlineDesktopSkeleton />;
}
