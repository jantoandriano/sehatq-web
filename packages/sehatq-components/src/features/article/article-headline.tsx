import React from "react";
import { ArticleCache, useGetArticle } from "./article-queries";
import {
  ArticleHeadlineDesktop,
  ArticleHeadlineDesktopSkeleton,
} from "./article-headline-desktop";
import {
  ArticleHeadlineMobile,
  ArticleHeadlineMobileSkeleton,
} from "./article-headline-mobile";

export type ArticleHeadlineProps = {
  isMobile?: boolean;
  articleSlug: string;
};

export type ArticleHeadlineSkeletonProps = {
  isMobile?: boolean;
};

function selectArticle(article: ArticleCache) {
  return article.data;
}

export function ArticleHeadline(props: ArticleHeadlineProps) {
  const { isMobile, articleSlug } = props;

  const { data: article, isLoading } = useGetArticle(
    { articleSlug: articleSlug },
    { select: selectArticle }
  );

  if (isLoading || !article) {
    return <ArticleHeadlineSkeleton isMobile={isMobile} />;
  }

  const articleHeadlineProps = {
    title: article.title,
    shareUrl: article.shareUrl,
    reviewedBy: article.reviewedBy,
    author: article.author,
    category: article.category,
    date: article.date,
    image: article.image,
    summary: article.summary,
    sponsorUrl: article.sponsorUrl,
    hasSponsored: article.hasSponsored,
    sponsorImageUrl: article.sponsorImageUrl,
  };

  if (isMobile) {
    return <ArticleHeadlineMobile {...articleHeadlineProps} />;
  }

  return <ArticleHeadlineDesktop {...articleHeadlineProps} />;
}

export function ArticleHeadlineSkeleton(props: ArticleHeadlineSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <ArticleHeadlineMobileSkeleton />;

  return <ArticleHeadlineDesktopSkeleton />;
}
