import React from "react";
import { useRouter } from "next/router";
import { ArticleDesktop } from "./article-desktop";
import { ArticleMobile } from "./article-mobile";

export type ArticleProps = {
  isMobile: boolean;
};

export function Article(props: ArticleProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { articleSlug } = router.query;
  const slug = articleSlug?.toString() ?? "";

  const newProps = {
    slug,
  };
  if (isMobile) {
    return <ArticleMobile {...newProps} />;
  }
  return <ArticleDesktop {...newProps} />;
}
