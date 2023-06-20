import React from "react";
import { Text } from "../../user-interfaces";
import {
  ArticleHorizontalListMobile,
  ArticleHorizontalListMobileProps,
} from "./article-horizontal-list-mobile";

export function NewArticlesMobile({
  articles,
  isLoading,
}: ArticleHorizontalListMobileProps) {
  return (
    <>
      {articles.length > 0 ? (
        <>
          <Text mb={1} fontSize="lg" fontFamily="poppins" fontWeight="semibold">
            Artikel Terbaru
          </Text>
          <ArticleHorizontalListMobile
            articles={articles}
            isLoading={isLoading}
          />
        </>
      ) : null}
    </>
  );
}
