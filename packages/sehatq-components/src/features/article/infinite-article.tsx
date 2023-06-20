import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { articleKeys, ArticleCache } from "./article-queries";
import {
  relatedArticleKeys,
  RelatedArticlesCache,
} from "./related-article-queries";
import { InfiniteArticleDesktop } from "./infinite-article-desktop";
import { InfiniteArticleMobile } from "./infinite-article-mobile";

export type InfiniteArticleProps = {
  isMobile?: boolean;
  initialSlug: string;
  top?: React.ReactElement;
  divider?: React.ReactElement;
  onView?: (articleSlug: string) => void;
  itemContainer?: (props: {
    index: number;
    articleSlug: string;
    children: React.ReactElement;
  }) => React.ReactElement;
};

export function InfiniteArticle(props: InfiniteArticleProps) {
  const { isMobile, initialSlug, onView, itemContainer, top, divider } = props;
  const [stateArticleSlugs, setStateArticleSlugs] = useState([initialSlug]);
  const queryClient = useQueryClient();

  function onBottom() {
    const lastArticleCache = queryClient.getQueryData<ArticleCache>(
      articleKeys.detail({
        articleSlug: stateArticleSlugs[stateArticleSlugs.length - 1],
      })
    );
    if (lastArticleCache) {
      const relatedArticlesCache =
        queryClient.getQueryData<RelatedArticlesCache>(
          relatedArticleKeys.list({
            tagId: lastArticleCache.data.tags.map((tag) => tag.id).join(","),
            quantity: "4",
            repeater: "1",
          })
        );
      if (relatedArticlesCache) {
        setStateArticleSlugs((oldStateArticleSlugs) => {
          const lastRelatedArticleSlug =
            relatedArticlesCache.data[relatedArticlesCache.data.length - 1]
              .slug;
          if (!oldStateArticleSlugs.includes(lastRelatedArticleSlug)) {
            return [...oldStateArticleSlugs, lastRelatedArticleSlug];
          } else {
            return oldStateArticleSlugs;
          }
        });
      }
    }
  }

  const newProps = {
    articleSlugs: stateArticleSlugs,
    itemContainer,
    onBottom,
    divider,
    onView,
    top,
  };
  if (isMobile) {
    return <InfiniteArticleMobile {...newProps} />;
  }
  return <InfiniteArticleDesktop {...newProps} />;
}
