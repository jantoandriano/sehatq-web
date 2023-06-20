import React from "react";
import { ENV, URLS } from "@sehatq/constants";
import { generateBreadcrumbMicrodata } from "./microdata-helpers";

export function generateTelemedicineHospitalMicrodata(
  hospitalName: string,
  hospitalSlug: string,
  specialitySlug?: string,
  specialityName?: string
) {
  // Breadcrumb
  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}${URLS.TELEMEDICINES}`,
      name: "Chat Dokter",
    },
    {
      id: `${ENV.SEHATQ_DOMAIN}${URLS.TELEMEDICINES}/faskes/${hospitalSlug}`,
      name: `${hospitalName}`,
    },
  ];

  if (specialitySlug && specialityName) {
    breadCrumb.push({
      id: `${ENV.SEHATQ_DOMAIN}${URLS.TELEMEDICINES}/faskes/${hospitalSlug}/${specialitySlug}`,
      name: specialityName,
    });
  }

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
