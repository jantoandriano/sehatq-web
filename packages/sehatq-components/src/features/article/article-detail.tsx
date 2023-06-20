import React, { memo } from "react";
import { ArticleCache, useGetArticle } from "./article-queries";
import { ArticleDetailMobile } from "./article-detail-mobile";
import { ArticleDetailDesktop } from "./article-detail-desktop";
import { useSubmitViewCounter } from "./article-view-counter-queries";

export type ArticleDetailProps = {
  isMobile?: boolean;
  articleSlug: string;
};

function selectArticleData(article: ArticleCache) {
  return article.data;
}

export const ArticleDetail = memo((props: ArticleDetailProps) => {
  const { isMobile, articleSlug } = props;
  const submitCounter = useSubmitViewCounter();

  const { data: articleData } = useGetArticle(
    { articleSlug },
    {
      select: selectArticleData,
    }
  );

  // submit view counter
  function submitArticleCounter(inView: boolean) {
    if (articleData && inView) {
      submitCounter.mutate({
        feature: "article",
        id: articleData.id,
      });
    }
  }

  if (!articleData) {
    return null;
  }

  const newProps = {
    isMobile,
    quantity: 3,
    articleSlug,
    shareUrl: articleData.shareUrl,
    tagId: articleData.tags.map((tag) => tag.id).join(","),
    submitArticleCounter,
  };

  if (isMobile) {
    return <ArticleDetailMobile {...newProps} />;
  }
  return <ArticleDetailDesktop {...newProps} />;
});

ArticleDetail.displayName = "ArticleDetail";
