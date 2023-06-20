import React, { useState } from "react";
import {
  ArticleCategoryNavbarDesktop,
  ArticleCategoryNavbarDesktopSkeleton,
} from "./article-category-navbar-desktop";
import {
  ArticleCategoryNavbarMobile,
  ArticleCategoryNavbarMobileSkeleton,
} from "./article-category-navbar-mobile";
import { ArticlesCache, useGetArticles } from "./article-queries";

export type ArticleCategoryNavbarProps = {
  isMobile: boolean;
  page?: number;
  perPage?: number;
  currentCategorySlug?: string;
};

export type ArticleCategoryNavbarSkeletonProps = {
  isMobile?: boolean;
};

function selectCategories(cache: ArticlesCache) {
  return cache.meta.filter.categories;
}

export function ArticleCategoryNavbar(props: ArticleCategoryNavbarProps) {
  const { isMobile, currentCategorySlug, perPage, page } = props;
  const [isOther, setOpenOther] = useState(false);
  const onClickOtherCategories = () => {
    setOpenOther(!isOther);
  };

  const query = {
    page: page ? `${page}` : "1",
    perPage: perPage ? `${perPage}` : "10",
    categorySlug: currentCategorySlug ?? "",
    categoryId: "",
    tagSlug: "",
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useGetArticles(query, {
    select: selectCategories,
    keepPreviousData: true,
  });

  const articleCategoryNavbarProps = {
    categories: categories ?? [],
    currentCategorySlug: currentCategorySlug ?? "",
    isOther,
    onClickOtherCategories,
  };

  if (error) {
    return null;
  }

  if (isLoading) {
    return <ArticleCategoryNavbarSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <ArticleCategoryNavbarMobile {...articleCategoryNavbarProps} />;
  }

  return <ArticleCategoryNavbarDesktop {...articleCategoryNavbarProps} />;
}

export function ArticleCategoryNavbarSkeleton(
  props: ArticleCategoryNavbarSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <ArticleCategoryNavbarMobileSkeleton />;

  return <ArticleCategoryNavbarDesktopSkeleton />;
}
