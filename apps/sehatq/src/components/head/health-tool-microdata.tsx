import React from "react";
import { ENV, URLS } from "@sehatq/constants";
import { generateBreadcrumbMicrodata } from "./microdata-helpers";

export function generateHealthToolMicrodata(slug: string, name: string) {
  // Breadcrumb
  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}${URLS.HEALTH_TOOLS}`,
      name: "Tes Kesehatan",
    },
    {
      id: `${ENV.SEHATQ_DOMAIN}${URLS.HEALTH_TOOLS}/${slug}`,
      name: name,
    },
  ];

  const microdata = [...generateBreadcrumbMicrodata(breadCrumb)];

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
