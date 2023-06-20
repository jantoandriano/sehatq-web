import React from "react";
import { Text } from "../../user-interfaces";
import {
  ArticleHorizontalListDesktop,
  ArticleHorizontalListDesktopProps,
} from "./article-horizontal-list-desktop";

export function NewArticlesDesktop({
  articles,
  isLoading,
}: ArticleHorizontalListDesktopProps) {
  return (
    <>
      {articles.length > 0 ? (
        <>
          <Text mb={3} fontSize="lg" fontFamily="poppins" fontWeight="semibold">
            Artikel Terbaru
          </Text>
          <ArticleHorizontalListDesktop
            articles={articles}
            isLoading={isLoading}
          />
        </>
      ) : null}
    </>
  );
}
