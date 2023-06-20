import React, { useState } from "react";
import { ArticleCache, useGetArticle } from "./article-queries";
import {
  ArticleReferencesDesktop,
  ArticleReferencesDesktopSkeleton,
} from "./article-references-desktop";
import {
  ArticleReferencesMobile,
  ArticleReferencesMobileSkeleton,
} from "./article-references-mobile";

export type ArticleReferencesProps = {
  isMobile?: boolean;
  articleSlug: string;
};

export type ArticleReferencesSkeletonProps = {
  isMobile?: boolean;
};

function selectArticle(article: ArticleCache) {
  return article.data;
}

export function ArticleReferences(props: ArticleReferencesProps) {
  const { isMobile, articleSlug } = props;
  const [open, setOpen] = useState(false);

  const { data: article, isLoading } = useGetArticle(
    { articleSlug: articleSlug },
    { select: selectArticle }
  );

  const onCollapse = () => {
    setOpen(!open);
  };
  const articleReferencesProps = {
    references: article?.reference ?? "",
    open,
    onCollapse,
  };

  if (isLoading) {
    return <ArticleReferencesSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <ArticleReferencesMobile {...articleReferencesProps} />;
  }

  return <ArticleReferencesDesktop {...articleReferencesProps} />;
}

export function ArticleReferencesSkeleton(
  props: ArticleReferencesSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <ArticleReferencesMobileSkeleton />;

  return <ArticleReferencesDesktopSkeleton />;
}
