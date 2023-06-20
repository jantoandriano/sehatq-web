import React from "react";
import { useRouter } from "next/router";
import { ArticleListMobile } from "./article-list-mobile";
import { ArticleListDesktop } from "./article-list-desktop";

export type ArticleListPageProps = {
  isMobile: boolean;
};

export function ArticleListPage(props: ArticleListPageProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { slugs = [], page, perPage } = router.query;
  const [categorySlug] = slugs as string[];

  const newProps = {
    isMobile,
    page: Number(page) ?? 1,
    perPage: Number(perPage) ?? 10,
    categorySlug,
  };

  if (isMobile) {
    return <ArticleListMobile {...newProps} />;
  }
  return <ArticleListDesktop {...newProps} />;
}
