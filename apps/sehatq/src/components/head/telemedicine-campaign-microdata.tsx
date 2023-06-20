import React from "react";
import { ENV } from "@sehatq/constants";
import { generateBreadcrumbMicrodata } from "./microdata-helpers";

export function telemedicineCampaignMicrodata(
  campaignSlug: string,
  campaignTitle: string
) {
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/campaign`;
  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/telemed`,
      name: "Chat Dokter",
    },
  ];

  breadCrumb.push({
    id: `${contentUrl}/${campaignSlug}`,
    name: `Dokter Spesialis ${campaignTitle}`,
  });

  return generateBreadcrumbMicrodata(breadCrumb).map((item, idx) => (
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
