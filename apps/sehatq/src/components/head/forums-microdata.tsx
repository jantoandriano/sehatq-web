import React from "react";
import { ENV } from "@sehatq/constants";
import { Forums } from "@sehatq/components";
import {
  generateBreadcrumbMicrodata,
  generateDataList,
} from "./microdata-helpers";

export type ForumsMicrodataArgs = {
  forums: Forums[];
  category?: {
    id: number;
    name: string;
    slug: string;
  };
};

export function generateForumsMicrodata(args: ForumsMicrodataArgs) {
  const { category, forums } = args;

  const items = forums;
  const itemUrl = items.map(
    (item) => `${ENV.SEHATQ_DOMAIN}/forum/${item.slug}`
  );

  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/forum`,
      name: category ? "Forum" : "Forum Tanya Jawab Kesehatan",
    },
    ...(category
      ? [
          {
            id: `${ENV.SEHATQ_DOMAIN}/forum/${category.slug}`,
            name: category.name,
          },
        ]
      : []),
  ];

  const microdata = [
    ...generateDataList(itemUrl),
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
