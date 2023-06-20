import React from "react";
import { RelatedArticlesDesktop } from "./related-articles-desktop";
import { RelatedArticlesMobile } from "./related-articles-mobile";
import {
  useGetRelatedArticles,
  RelatedArticlesCache,
} from "./related-article-queries";

import { ArticleCardSkeleton } from "./article-card";

export type RelatedArticlesProps = {
  isMobile?: boolean;
  quantity?: number;
  extended?: number;
  tagId: string;
};

function selectData(relatedArticles: RelatedArticlesCache) {
  return relatedArticles.data;
}

export function RelatedArticles(props: RelatedArticlesProps) {
  const { isMobile, quantity = 3, tagId, extended = 0 } = props;

  const query = {
    quantity: `${quantity + extended}`,
    repeater: "1",
    tagId,
  };

  const {
    data: relatedArticles,
    isLoading,
    error,
  } = useGetRelatedArticles(query, {
    select: selectData,
  });

  const otherProps = {
    relatedArticles: error ? [] : relatedArticles?.slice(0, quantity) ?? [],
  };

  if (isLoading) {
    return <ArticleCardSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <RelatedArticlesMobile {...otherProps} />;
  }

  return <RelatedArticlesDesktop {...otherProps} />;
}
