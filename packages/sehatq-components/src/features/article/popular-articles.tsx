import React from "react";
import { PopularArticlesCache, useGetPopularArticles } from "./article-queries";
import { PopularArticlesData } from "./articles-model";
import {
  PopularArticlesDesktopSkeleton,
  PopularArticlesDesktop,
} from "./popular-articles-desktop";

export type PopularArticleProps = {
  limit?: number;
  viewDate?: string;
};

function selectData(PopularArticles: PopularArticlesCache) {
  return PopularArticles;
}

export function PopularArticles(props: PopularArticleProps) {
  const { limit, viewDate } = props;

  const query = {
    limit: limit ? String(limit) : "5",
    viewDate: viewDate || "2-week-ago",
  };

  const { data, isLoading } = useGetPopularArticles(query, {
    select: selectData,
  });
  const popularArticlesData: PopularArticlesData[] = data?.data || [];

  if (isLoading) return <PopularArticlesDesktopSkeleton />;

  return <PopularArticlesDesktop data={popularArticlesData} />;
}
