import React from "react";
import { useGetTagSEO, TagSEOCache } from "./tag-seo-queries";
import { TagContentDesktop } from "./tag-content-desktop";
import { TagContentMobile } from "./tag-content-mobile";

function selectTagSEOContent(tagSEO: TagSEOCache) {
  return {
    contentTitle: tagSEO.contentTitle,
    contentDescription: tagSEO.contentDescription,
  };
}

export type TagContentProps = {
  isMobile: boolean;
  tagSlug: string;
};

export function TagContent(props: TagContentProps) {
  const { isMobile, tagSlug } = props;

  const query = {
    tagSlug,
  };

  const { data } = useGetTagSEO(query, { select: selectTagSEOContent });

  if (!data) {
    return null;
  }

  if (isMobile) {
    return <TagContentMobile {...data} />;
  }
  return <TagContentDesktop {...data} />;
}
