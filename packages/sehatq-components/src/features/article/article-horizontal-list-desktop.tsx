import React from "react";
import { Box, SimpleGrid } from "../../user-interfaces";
import {
  SimpleArticleCard,
  SimpleArticleCardProps,
  SimpleArticleCardSkeleton,
} from "./simple-article-card";

export interface ArticleHorizontalListDesktopProps {
  articles: Omit<SimpleArticleCardProps, "isMobile">[];
  isLoading: boolean;
}

export function ArticleHorizontalListDesktop({
  articles,
  isLoading,
}: ArticleHorizontalListDesktopProps) {
  return (
    <SimpleGrid spacing={3} columns={articles.length || 5}>
      {articles.length
        ? articles.map((article) => (
            <Box key={article.slug}>
              <SimpleArticleCard isMobile={false} {...article} />
            </Box>
          ))
        : isLoading
        ? Array.from(Array(5).keys()).map((id) => (
            <Box key={id}>
              <SimpleArticleCardSkeleton key={id} />
            </Box>
          ))
        : null}
    </SimpleGrid>
  );
}
