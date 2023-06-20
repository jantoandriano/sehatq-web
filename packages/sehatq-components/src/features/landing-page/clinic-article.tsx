import React, { ReactElement } from "react";

import { NavigationValue } from "@sehatq/utils";
import { ArticlesCache, useGetArticles } from "../article/article-queries";
import {
  ClinicArticleDesktop,
  ClinicArticleSkeletonDesktop,
} from "./clinic-article-desktop";
import {
  ClinicArticleMobile,
  ClinicArticleSkeletonMobile,
} from "./clinic-article-mobile";

function selectArticlesData(articles: ArticlesCache) {
  return articles.data;
}

export type ClinicArticleProps = {
  isMobile: boolean;
  title: ReactElement;
  perPage: string;
  tagSlug: string;
  articlesNavigation?: NavigationValue;
};
export type ClinicArticleSkeletonProps = { isMobile: boolean };

export function ClinicArticle(props: ClinicArticleProps) {
  const { isMobile, title, perPage, tagSlug, articlesNavigation } = props;

  const articleQuery = {
    page: "1",
    perPage,
    categoryId: "",
    categorySlug: "",
    tagSlug,
  };

  const { data: articles, isLoading } = useGetArticles(articleQuery, {
    select: selectArticlesData,
  });

  const newProps = {
    title,
    articlesNavigation,
    articles: articles ?? [],
  };

  if (isLoading) {
    return <ClinicArticleSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <ClinicArticleMobile {...newProps} />;
  }
  return <ClinicArticleDesktop {...newProps} />;
}

export function ClinicArticleSkeleton(props: ClinicArticleSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ClinicArticleSkeletonMobile />;
  }
  return <ClinicArticleSkeletonDesktop />;
}
