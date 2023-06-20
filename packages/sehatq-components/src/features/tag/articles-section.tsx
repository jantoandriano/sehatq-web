import React from "react";

import { useGetArticles, ArticlesCache } from "../article";
import {
  ArticlesSectionDesktop,
  ArticleSectionDesktopSkeleton,
} from "./articles-section-desktop";
import {
  ArticlesSectionMobile,
  ArticleSectionMobileSkeleton,
} from "./articles-section-mobile";

function selectData(ArticleList: ArticlesCache) {
  return {
    featured: ArticleList.meta?.featured,
    data: ArticleList.data.slice(0, 3).map((article) => {
      return {
        id: article.id,
        slug: article.slug,
        imageUrl: article.imageUrl,
        title: article.title,
        category: article.category,
        author: article.author,
        date: article.date,
        rating: article.rating,
      };
    }),
  };
}

export type ArticlesSectionSkeletonProps = {
  isMobile?: boolean;
};

export type ArticlesSectionProps = {
  isMobile?: boolean;
  tagSlug: string;
};

export function ArticlesSection(props: ArticlesSectionProps) {
  const { isMobile, tagSlug } = props;

  const query = {
    page: "1",
    perPage: "3",
    categoryId: "",
    categorySlug: "",
    tagSlug,
  };

  const {
    data: articles,
    isLoading,
    error,
  } = useGetArticles(query, {
    select: selectData,
  });

  const otherProps = {
    articles: error ? [] : articles?.data ?? [],
    featured: articles?.featured,
    tagSlug,
  };

  if (isLoading) {
    return <ArticlesSectionSkeleton isMobile={isMobile} />;
  }

  if (articles?.data?.length === 0) {
    return null;
  }

  if (isMobile) {
    return <ArticlesSectionMobile {...otherProps} />;
  }
  return <ArticlesSectionDesktop {...otherProps} />;
}

export function ArticlesSectionSkeleton(props: ArticlesSectionSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <ArticleSectionMobileSkeleton />;

  return <ArticleSectionDesktopSkeleton />;
}
