import React from "react";
import { Articles } from "@sehatq/components";
import { ENV } from "@sehatq/constants";
import { slugToName } from "@sehatq/utils";
import {
  generateBreadcrumbMicrodata,
  generateDataList,
} from "./microdata-helpers";

export type TagMicrodataArgs = {
  tagSlug: string;
  articles: Articles[];
};

export function generateTagMicrodata(args: TagMicrodataArgs) {
  const { tagSlug, articles } = args;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/tag/${tagSlug}`;

  // Breadcrumb
  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/tag`,
      name: "Artikel",
    },
    {
      id: contentUrl,
      name: slugToName(tagSlug),
    },
  ];

  const urlList: string[] =
    articles &&
    articles.map((article) => `${ENV.SEHATQ_DOMAIN}/artikel/${article.slug}`);

  const microdata = [
    ...generateBreadcrumbMicrodata(breadCrumb),
    ...generateDataList(urlList),
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
