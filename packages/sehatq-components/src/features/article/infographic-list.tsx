import React from "react";
import {
  InfographicListDesktop,
  InfographicListSkeletonDesktop,
} from "./infographic-list-desktop";
import {
  InfographicListMobile,
  InfographicListSkeletonMobile,
} from "./infographic-list-mobile";
import { useGetArticles, ArticlesCache } from "./article-queries";

export type InfographicListProps = {
  isMobile: boolean;
  page?: number;
  perPage?: number;
};

function selectData(InfographicList: ArticlesCache) {
  return InfographicList;
}

export function InfographicList(props: InfographicListProps) {
  const { isMobile, page, perPage } = props;
  const categorySlug = "infografik";

  const query = {
    page: page ? `${page}` : "1",
    perPage: perPage ? `${perPage}` : "10",
    categorySlug,
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
  };

  if (isLoading) {
    if (isMobile) {
      return <InfographicListSkeletonMobile />;
    }

    return <InfographicListSkeletonDesktop />;
  }

  if (isMobile) {
    return <InfographicListMobile {...otherProps} />;
  }

  return <InfographicListDesktop {...otherProps} />;
}
