import { HCFList } from "@sehatq/components";
import { ENV, SCHEMA_URL_MICRODATA } from "@sehatq/constants";
import { encodeHtml } from "@sehatq/utils";
import React from "react";
import {
  generateBreadcrumbMicrodata,
  generateDataList,
} from "./microdata-helpers";

export type HCFsMicrodataArgs = {
  contentUrl: string;
  hcfTypeSlug: string;
  hcfTypeName: string;
  city: string;
  district: string;
  hcfs: HCFList[];
  procedure: { slug: string; name: string } | undefined;
};

function getHCFNames(hcfs = [] as HCFList[], length = 2, start = 0) {
  const end = start + length;
  const itemList = hcfs.slice(start, end - 1).map((item) => item.name);
  const items = hcfs.slice(start, end);

  let last = "";
  if (items.length > 1) {
    const item = items[items.length - 1];
    last = ` dan ${item.name}`;
  }
  return `${itemList.join(", ")}${last}`;
}

export function generateFAQData(data: {
  hcfs: HCFList[];
  hcfTypeName: string;
  location: string;
}) {
  const { hcfs, hcfTypeName, location } = data;

  const hcfTypeDesc =
    hcfTypeName !== "Puskesmas" ? hcfTypeName : `fasilitas kesehatan (faskes)`;
  const hcfType = hcfTypeName !== "Puskesmas" ? hcfTypeName : `faskes`;
  const area = location ? `di ${location} ` : "";

  return [
    {
      question: `Apa saja ${hcfTypeDesc} ${area}yang melayani pendaftaran pasien secara online?`,
      answer: `Fasilitas kesehatan di ${getHCFNames(
        hcfs,
        3
      )} mendapatkan penilaian terbaik dari para pengguna layanannya. ${getHCFNames(
        hcfs,
        2,
        3
      )} merupakan beberapa contoh dari ribuan ${hcfType} partner SehatQ ${area}yang melayani pendaftaran pasien secara online tanpa harus mengantri.`,
    },
    {
      question: `Apa saja ${hcfType} ${area}yang memiliki penilaian terbaik?`,
      answer: `${getHCFNames(
        hcfs,
        4
      )} merupakan ${hcfType} dengan penilaian terbaik.`,
    },
    {
      question: `Di mana ${hcfType} yang buka pada akhir pekan?`,
      answer: `${getHCFNames(
        hcfs,
        2
      )} memiliki layanan kesehatan yang buka di akhir pekan.`,
    },
    {
      question: `Apakah ada ${hcfType} yang punya layanan 24 jam?`,
      answer: `${getHCFNames(hcfs, 2)} memiliki layanan darurat 24 jam.`,
    },
    {
      question: "Mengapa melakukan pendaftaran online faskes di SehatQ?",
      answer: `SehatQ merupakan penyedia platform penghubung antara Anda (pasien) dengan ${encodeHtml(
        '<a href="https://www.sehatq.com/dokter">dokter</a>'
      )} dan/atau ${encodeHtml(
        '<a href="https://www.sehatq.com/dokter">fasilitas pelayanan kesehatan</a>'
      )} terkait. SehatQ mendukung layanan pembuatan janji temu di faskes yang tersebar di seluruh Indonesia.`,
    },
    {
      question: "Bagaimana cara menjadi partner SehatQ?",
      answer: `Lakukan pendaftaran menjadi partner atau mitra SehatQ dengan memeriksa tautan link berikut: ${encodeHtml(
        '<a href="https://www.sehatq.com/mitra-faskes">Mitra Faskes</a>'
      )} dan ${encodeHtml(
        '<a href="https://www.sehatq.com/mitra-perusahaan">Mitra Perusahaan.</a>'
      )}`,
    },
  ];
}

export function generateHCFSFAQMicrodata(
  faq: {
    question: string;
    answer: string;
  }[]
) {
  return [
    {
      "@context": SCHEMA_URL_MICRODATA,
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export function generateHCFsMicrodata(args: HCFsMicrodataArgs) {
  let pageName = "Daftar Faskes";

  if (args.hcfTypeName) {
    pageName = `${args.hcfTypeName} ${args.city} ${args.district}`;
  } else if (args.city || args.district) {
    pageName = args.city || args.district;
  }

  let breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/layanan-kesehatan`,
      name: "Daftar Layanan Kesehatan",
    },
    {
      id: args.contentUrl,
      name: pageName,
    },
  ];

  if (args.procedure) {
    breadCrumb = [
      { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
      ...(args.hcfTypeName
        ? [
            {
              id: `${ENV.SEHATQ_DOMAIN}/${args.hcfTypeSlug}`,
              name: args.hcfTypeName,
            },
          ]
        : [
            {
              id: `${ENV.SEHATQ_DOMAIN}/faskes`,
              name: "Daftar Faskes",
            },
          ]),
      {
        id: `${ENV.SEHATQ_DOMAIN}/${args.procedure.slug}`,
        name: args.procedure.name,
      },
      ...(args.district || args.city
        ? [
            {
              id: args.contentUrl,
              name: args.district || args.city,
            },
          ]
        : []),
    ];
  }

  const faqData = generateFAQData({
    hcfs: args.hcfs || [],
    hcfTypeName: args.hcfTypeName,
    location: args.district || args.city,
  });

  const microdata = [
    ...generateBreadcrumbMicrodata(breadCrumb),
    ...generateDataList(
      args.hcfs.map((hcf) => `${ENV.SEHATQ_DOMAIN}/faskes/${hcf.slug}`)
    ),
    ...generateHCFSFAQMicrodata(faqData),
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
