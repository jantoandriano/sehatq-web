import React from "react";
import { RelatedForumsDesktop } from "./related-forums-desktop";
import { RelatedForumsMobile } from "./related-forums-mobile";
import {
  useGetRelatedForums,
  RelatedForumsCache,
} from "./related-forums-queries";

function selectRelatedForums(relatedForums: RelatedForumsCache) {
  return relatedForums;
}

export type RelatedForumsProps = {
  isMobile?: boolean;
  tagId: string;
};

export function RelatedForums(props: RelatedForumsProps) {
  const { tagId, isMobile } = props;

  const {
    data: forums = [],
    isLoading,
    error,
  } = useGetRelatedForums({ tagId }, { select: selectRelatedForums });

  const basicProps = {
    forums,
    isLoading: isLoading && !error,
    error,
  };

  if (isMobile) {
    return <RelatedForumsMobile {...basicProps} />;
  }
  return <RelatedForumsDesktop {...basicProps} />;
}
