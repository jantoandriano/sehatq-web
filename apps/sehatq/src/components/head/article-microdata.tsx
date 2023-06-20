import React from "react";
import { Article, ArticleRating } from "@sehatq/components";
import { ENV } from "@sehatq/constants";
import {
  generateArticleDetailMicrodata,
  ArticleRatingMicrodata,
  generateArticleRatingMicrodata,
} from "./article-microdata-detail";
import { generateBreadcrumbMicrodata } from "./microdata-helpers";

export type ArticleMicrodataArgs = {
  articleSlug: string;
  article: Article;
  rating: ArticleRating | undefined;
};

export function generateArticleMicrodata(args: ArticleMicrodataArgs) {
  const { article, articleSlug, rating } = args;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/artikel/${articleSlug}`;

  // Breadcrumb
  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/artikel`,
      name: "Artikel",
    },
  ];

  if (article.category?.slug) {
    breadCrumb.push({
      id: `${ENV.SEHATQ_DOMAIN}/artikel/${article.category.slug}`,
      name: article.category.name,
    });
  }

  if (article.shareUrl) {
    breadCrumb.push({
      id: `${article.shareUrl}`,
      name: article.title,
    });
  }

  // article rating
  let microdataRating: ArticleRatingMicrodata[] = [];
  if (rating) {
    microdataRating = generateArticleRatingMicrodata(article, rating);
  }

  const microdata = [
    ...generateBreadcrumbMicrodata(breadCrumb),
    ...generateArticleDetailMicrodata(article, contentUrl),
    ...microdataRating,
  ];

  return microdata.map((item, idx) => (
    <script
      // no ids, static data
      // eslint-disable-next-line react/no-array-index-key
      key={idx}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(item),
      }}
    />
  ));
}
