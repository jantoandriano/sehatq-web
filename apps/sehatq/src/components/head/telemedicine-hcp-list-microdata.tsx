import React from "react";
import { ENV } from "@sehatq/constants";
import { slugToName } from "@sehatq/utils";
import { generateBreadcrumbMicrodata } from "./microdata-helpers";

export function telemedicineHCPListMicrodata(specialitySlug?: string) {
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/spesialis`;
  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/telemed`,
      name: "Chat Dokter",
    },
  ];

  if (specialitySlug) {
    breadCrumb.push({
      id: `${contentUrl}/${specialitySlug}`,
      name:
        specialitySlug === "umum"
          ? "Dokter Umum"
          : `Dokter Spesialis ${slugToName(specialitySlug)}`,
    });
  } else {
    breadCrumb.push({
      id: contentUrl,
      name: "Dokter Spesialis",
    });
  }

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
