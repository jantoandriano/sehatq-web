import React from "react";
import {
  Articles,
  ArticlesCache,
  ArticlesCategoryData,
} from "@sehatq/components";
import { ENV } from "@sehatq/constants";
import {
  generateBreadcrumbMicrodata,
  generateDataList,
  MicroDataItemList,
} from "./microdata-helpers";

export function generateMicrodataItemList(
  articles: Articles[],
  featuredSlug?: string
) {
  let microdataItemList: MicroDataItemList[] = [];
  const items = articles;
  const itemUrl: string[] = [];
  if (featuredSlug) {
    itemUrl.push(`${ENV.SEHATQ_DOMAIN}/artikel/${featuredSlug}`);
  }

  items.forEach((item) => {
    itemUrl.push(`${ENV.SEHATQ_DOMAIN}/artikel/${item.slug}`);
  });

  if (itemUrl.length > 0) {
    microdataItemList = generateDataList(itemUrl);
  }
  return microdataItemList;
}

export type ArticlesMicrodataArgs = {
  articles: ArticlesCache;
  category?: ArticlesCategoryData;
};

export function generateArticlesMicrodata(args: ArticlesMicrodataArgs) {
  const { category, articles } = args;

  // Breadcrumb
  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/artikel`,
      name: "Artikel Kesehatan",
    },
  ];

  if (category) {
    breadCrumb.push({
      id: `${ENV.SEHATQ_DOMAIN}/artikel/${category.slug}`,
      name: category.name,
    });
  }

  const microdata = [
    ...generateMicrodataItemList(articles.data, articles.meta.featured?.slug),
    ...generateBreadcrumbMicrodata(breadCrumb),
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
