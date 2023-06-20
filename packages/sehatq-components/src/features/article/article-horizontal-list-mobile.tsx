import React from "react";

import { Flex, Box } from "../../user-interfaces";
import {
  SimpleArticleCard,
  SimpleArticleCardProps,
  SimpleArticleCardSkeleton,
} from "./simple-article-card";

export interface ArticleHorizontalListMobileProps {
  articles: Omit<SimpleArticleCardProps, "isMobile">[];
  isLoading: boolean;
}

export function ArticleHorizontalListMobile({
  articles,
  isLoading,
}: ArticleHorizontalListMobileProps) {
  return (
    <Flex
      width="calc(100% + 24px)"
      overflowX="auto"
      marginLeft={-3}
      py={2}
      px={3}
    >
      {articles.length
        ? articles.map((article, index) => (
            <Box
              minWidth="144px"
              key={article.slug}
              marginLeft={index === 0 ? 0 : 3}
            >
              <SimpleArticleCard isMobile {...article} />
            </Box>
          ))
        : isLoading
        ? Array.from(Array(3).keys()).map((id, index) => (
            <Box
              key={id}
              minWidth="144px"
              marginRight={3}
              marginLeft={index === 0 ? 3 : 0}
            >
              <SimpleArticleCardSkeleton key={id} />
            </Box>
          ))
        : null}
    </Flex>
  );
}
