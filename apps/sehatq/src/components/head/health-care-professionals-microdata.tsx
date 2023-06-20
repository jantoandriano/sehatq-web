import React from "react";
import { HCPList } from "@sehatq/components";
import { ENV, SCHEMA_URL_MICRODATA } from "@sehatq/constants";
import { slugToName, encodeHtml } from "@sehatq/utils";
import { generateBreadcrumbMicrodata } from "./microdata-helpers";

function getHCPName(hcpList = [] as HCPList[], length = 2) {
  const itemList = hcpList
    .slice(0, length - 1)
    .map((item) => `${item.hcfName} ${item.name}`);
  const items = hcpList.slice(0, length);

  let last = "";
  if (items.length > 1) {
    const item = items[items.length - 1];
    last = ` dan ${item.hcfName} ${item.name}`;
  }

  return `${itemList.join(", ")}${last}`;
}

export function hcpsBreadcrumbMicrodata(hcpSlugs: {
  specialitySlug: string;
  citySlug: string;
  districtSlug: string;
  procedureId: string;
}) {
  const specialityName = slugToName(hcpSlugs?.specialitySlug) ?? "";
  const cityName = slugToName(hcpSlugs?.citySlug) ?? "";
  const districtName = slugToName(hcpSlugs?.districtSlug) ?? "";
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/dokter`;
  let breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/layanan-kesehatan`,
      name: "Daftar Layanan Kesehatan",
    },
    {
      id: `${ENV.SEHATQ_DOMAIN}/dokter`,
      name: "Daftar Dokter",
    },
  ];

  if (districtName || cityName) {
    breadCrumb = [
      { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
      {
        id: `${ENV.SEHATQ_DOMAIN}/dokter`,
        name: `Dokter ${specialityName}`,
      },
      {
        id: `${contentUrl}`,
        name: `${districtName} || ${districtName}`,
      },
    ];
  } else if (specialityName) {
    breadCrumb = [
      { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
      {
        id: `${ENV.SEHATQ_DOMAIN}/layanan-kesehatan`,
        name: "Daftar Layanan Kesehatan",
      },
      {
        id: `${ENV.SEHATQ_DOMAIN}/dokter/${hcpSlugs.specialitySlug}`,
        name: `${specialityName}`,
      },
    ];
  }

  return generateBreadcrumbMicrodata(breadCrumb);
}
export function hcpsMicrodata(
  data: HCPList[],
  hcpSlugs: {
    specialitySlug: string;
    citySlug: string;
    districtSlug: string;
    procedureId: string;
  }
) {
  const specialityName = slugToName(hcpSlugs?.specialitySlug) ?? "";
  const districtName = slugToName(hcpSlugs?.districtSlug) ?? "";
  const cityName = slugToName(hcpSlugs?.citySlug) ?? "";
  const area =
    hcpSlugs?.districtSlug || hcpSlugs?.citySlug
      ? `di ${districtName}${
          hcpSlugs?.districtSlug && hcpSlugs?.citySlug ? ", " : ""
        }${cityName} `
      : "";
  const areaSehatq = area ?? " di SehatQ";
  const dataHcpsList = {
    "@context": SCHEMA_URL_MICRODATA,
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Siapa saja dokter ${specialityName} ${area}yang melayani pendaftaran pasien secara online?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Dokter ${getHCPName(
            data,
            5
          )} merupakan beberapa contoh dari puluhan ribuan dokter partner SehatQ yang melayani pendaftaran pasien secara online tanpa harus mengantri.`,
        },
      },
      {
        "@type": "Question",
        name: `Mengapa melakukan pendaftaran online dokter ${areaSehatq}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `SehatQ merupakan penyedia platform penghubung antara Anda (pasien) dengan ${encodeHtml(
            '<a href="https://www.sehatq.com/dokter">dokter</a>'
          )} dan/atau ${encodeHtml(
            '<a href="https://www.sehatq.com/dokter">fasilitas pelayanan kesehatan</a>'
          )} terkait. SehatQ mendukung layanan pembuatan janji temu dengan dokter yang tersebar di seluruh Indonesia.`,
        },
      },
      {
        "@type": "Question",
        name: "Bagaimana cara menjadi partner SehatQ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Lakukan pendaftaran menjadi partner atau mitra SehatQ dengan memeriksa tautan link berikut: ${encodeHtml(
            '<a href="https://www.sehatq.com/mitra-faskes">Mitra Faskes</a>'
          )} dan ${encodeHtml(
            '<a href="https://www.sehatq.com/mitra-perusahaan">Mitra Perusahaan.</a>'
          )}`,
        },
      },
    ],
  };

  const microdata = [...[dataHcpsList], ...hcpsBreadcrumbMicrodata(hcpSlugs)];

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
