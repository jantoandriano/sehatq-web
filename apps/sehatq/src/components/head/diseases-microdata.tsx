import React from "react";
import { ENV, URLS } from "@sehatq/constants";
import { generateBreadcrumbMicrodata } from "./microdata-helpers";

export function generateDiseaseMicrodata() {
  // Breadcrumb
  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/info-kesehatan`,
      name: "Info Kesehatan",
    },
    {
      id: `${ENV.SEHATQ_DOMAIN}${URLS.DISEASES}`,
      name: "Daftar Penyakit",
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
