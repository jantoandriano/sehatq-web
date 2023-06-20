import React from "react";
import { Box, Divider, VStack } from "../../user-interfaces";
import {
  ArticleCardMobile,
  ArticleCardMobileProps,
} from "./article-card-mobile";

export type RelatedArticlesMobileProps = {
  relatedArticles: ArticleCardMobileProps[];
};
export function RelatedArticlesMobile(props: RelatedArticlesMobileProps) {
  const { relatedArticles } = props;
  return (
    <VStack
      spacing="3"
      align="normal"
      divider={<Divider borderColor="veryLightPink" />}
    >
      {relatedArticles.map((data) => (
        <Box key={data.id}>
          <ArticleCardMobile {...data} />
        </Box>
      ))}
    </VStack>
  );
}
