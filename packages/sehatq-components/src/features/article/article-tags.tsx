import React from "react";
import { ArticleCache, useGetArticle } from "./article-queries";
import {
  ArticleTagsDesktop,
  ArticleTagsDesktopSkeleton,
} from "./article-tags-desktop";
import {
  ArticleTagsMobile,
  ArticleTagsMobileSkeleton,
} from "./article-tags-mobile";

export type ArticleTagsProps = {
  isMobile?: boolean;
  articleSlug: string;
};

export type ArticleTagsSkeletonProps = {
  isMobile?: boolean;
};

function selectArticle(article: ArticleCache) {
  return article.data;
}

export function ArticleTags(props: ArticleTagsProps) {
  const { isMobile, articleSlug } = props;

  const { data: article, isLoading } = useGetArticle(
    { articleSlug: articleSlug },
    { select: selectArticle }
  );

  const articleTagsProps = {
    tags: article?.tags ?? [],
  };

  if (isLoading) {
    return <ArticleTagsSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <ArticleTagsMobile {...articleTagsProps} />;
  }

  return <ArticleTagsDesktop {...articleTagsProps} />;
}

export function ArticleTagsSkeleton(props: ArticleTagsSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <ArticleTagsMobileSkeleton />;

  return <ArticleTagsDesktopSkeleton />;
}
