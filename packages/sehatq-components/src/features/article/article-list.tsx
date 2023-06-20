import React from "react";
import { AdSlot } from "../google-publisher-tag";
import {
  ArticleListDesktop,
  ArticleListSkeletonDesktop,
} from "./article-list-desktop";
import {
  ArticleListMobile,
  ArticleListSkeletonMobile,
} from "./article-list-mobile";
import { useGetArticles, ArticlesCache } from "./article-queries";

export type ArticleListProps = {
  isMobile: boolean;
  page?: number;
  perPage?: number;
  categoryId?: number;
  categorySlug?: string;
  adsTop?: ReturnType<typeof AdSlot>;
  adsMiddle?: ReturnType<typeof AdSlot>;
  adsBottom?: ReturnType<typeof AdSlot>;
};

function selectData(ArticleList: ArticlesCache) {
  return ArticleList;
}

export function ArticleList(props: ArticleListProps) {
  const {
    isMobile,
    page,
    perPage,
    categorySlug,
    adsTop,
    adsMiddle,
    adsBottom,
  } = props;

  const query = {
    page: page ? `${page}` : "1",
    perPage: perPage ? `${perPage}` : "10",
    categorySlug: categorySlug ?? "",
    categoryId: "",
    tagSlug: "",
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
    page: query.page,
    maxPage: `${articles?.meta.pagination.maxPage}` ?? "1",
    categorySlug,
    featured: articles?.meta.featured,
    adsTop,
    adsMiddle,
    adsBottom,
  };
  if (isLoading) {
    if (isMobile) return <ArticleListSkeletonMobile {...otherProps} />;
    return <ArticleListSkeletonDesktop {...otherProps} />;
  }

  if (isMobile) {
    return <ArticleListMobile {...otherProps} />;
  }

  return <ArticleListDesktop {...otherProps} />;
}
