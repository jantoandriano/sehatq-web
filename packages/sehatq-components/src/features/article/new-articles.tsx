import React from "react";
import { NewArticlesDesktop } from "./new-articles-desktop";
import { NewArticlesMobile } from "./new-articles-mobile";
import { useGetArticles, ArticlesCache } from "./article-queries";

export type NewArticlesProps = {
  isMobile: boolean;
};

function selectData(cache: ArticlesCache) {
  return cache.data;
}

export function NewArticles(props: NewArticlesProps) {
  const { isMobile } = props;

  const query = {
    page: "1",
    perPage: "5",
    categoryId: "",
    categorySlug: "",
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
    articles: error ? [] : articles ?? [],
    isLoading,
  };

  if (isMobile) {
    return <NewArticlesMobile {...otherProps} />;
  }

  return <NewArticlesDesktop {...otherProps} />;
}
