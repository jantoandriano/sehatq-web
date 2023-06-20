import React from "react";
import { Box } from "../../user-interfaces";
import {
  ArticleCardDesktopProps,
  ArticleCardDesktop,
} from "./article-card-desktop";

export type RelatedArticlesDesktopProps = {
  relatedArticles: ArticleCardDesktopProps[];
};

export function RelatedArticlesDesktop(props: RelatedArticlesDesktopProps) {
  const { relatedArticles } = props;
  return (
    <>
      {relatedArticles.map((data) => (
        <Box key={data.id} pb={8}>
          <ArticleCardDesktop {...data} />
        </Box>
      ))}
    </>
  );
}
