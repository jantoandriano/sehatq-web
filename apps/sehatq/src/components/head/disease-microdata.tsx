import React from "react";
import { ENV, URLS, SCHEMA_URL_MICRODATA } from "@sehatq/constants";
import { DiseaseDetailCache, DiseaseDetail } from "@sehatq/components";
import {
  formatDate,
  parseToDate,
  encodeHtml,
  convertDateToEnglish,
} from "@sehatq/utils";

export type DiseaseMicrodataArgs = {
  disease: DiseaseDetailCache | undefined;
  contentUrl: string;
};

interface KeyObjectTable {
  Umum: string;
  Kandungan: string;
  Anak: string;
  "Penyakit Dalam": string;
  Hematologi: string;
  Endokrin: string;
  Ginjal: string;
  Urologi: string;
  Jantung: string;
  Saraf: string;
  Gigi: string;
  Mata: string;
  Gizi: string;
  Lainnya: string;
  Andrologi: string;
  THT: string;
  Paru: string;
  Bedah: string;
  Jiwa: string;
  Akupunktur: string;
  Fisioterapi: string;
  Ortopedi: string;
  Kulit: string;
  "Bedah Anak": string;
  "Bedah Plastik": string;
  Onkologi: string;
  Psikologi: string;
}

const MEDICAL_SPECIALTY = {
  Umum: "PrimaryCare",
  Kandungan: "Obstetric",
  Anak: "Pediatric",
  "Penyakit Dalam": "Gastroenterologic",
  Hematologi: "Hematologic",
  Endokrin: "Endocrine",
  Ginjal: "",
  Urologi: "Urologic",
  Jantung: "Cardiovascular",
  Saraf: "Neurologic",
  Gigi: "Dentistry",
  Mata: "Optometric",
  Gizi: "DietNutrition",
  Lainnya: "",
  Andrologi: "",
  THT: "Otolaryngologic",
  Paru: "Pulmonary",
  Bedah: "Surgical",
  Jiwa: "Psychiatric",
  Akupunktur: "",
  Fisioterapi: "Physiotherapy",
  Ortopedi: "",
  Kulit: "Dermatology",
  "Bedah Anak": "Surgical",
  "Bedah Plastik": "PlasticSurgery",
  Onkologi: "Oncologic",
  Psikologi: "",
};

export function getParagraph(content: string, total = 1) {
  const regex = /<p[^>]*>(.*?)<\/p>/gi;
  const result = content.match(regex);
  let newContent = "";
  if (result) {
    for (let idx = 0; idx < total; idx++) {
      if (result[idx]) {
        newContent += result[idx];
      }
    }
  }
  return newContent;
}
export function getFirstParagraf(item: string) {
  if (item) {
    return getParagraph(item, 1).replace(/<[^>]+>/g, "");
  }
  return [];
}

export function generateNewsDiseaseMicrodata(
  data: DiseaseDetail | undefined,
  contentUrl: string
) {
  const authorUrl = `${ENV.SEHATQ_DOMAIN}${URLS.AUTHOR.replace(
    "[slug]",
    data?.author?.slug ?? ""
  )}`;

  const datetimeFormat = "yyyy-MM-dd'T'HH:mm:ssxxx";

  const dataNewsDisease = {
    "@context": SCHEMA_URL_MICRODATA,
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "MedicalWebPage",
      "@id": `${contentUrl}`,
    },
    headline: data?.title,
    image: {
      "@type": "ImageObject",
      url: data?.images[0].url,
    },
    datePublished: data?.date
      ? formatDate(convertDateToEnglish(data.date), datetimeFormat)
      : "",
    dateModified: data?.updatedAt
      ? formatDate(
          parseToDate(data.updatedAt, "yyyy-MM-dd HH:mm:ss"),
          datetimeFormat
        )
      : "",
    author: {
      "@type": "Person",
      name: data?.author?.name || "Tim SehatQ",
      ...(authorUrl && {
        url: authorUrl,
      }),
    },
    publisher: {
      "@type": "Organization",
      name: "SehatQ",
      logo: {
        "@type": "ImageObject",
        url: "https://www.sehatq.com/public/assets/img/logo.png?v=05202011",
      },
    },
    description: data?.meta || "",
  };

  return [dataNewsDisease];
}

export function generateDiseaseListMicrodata(data: DiseaseDetail | undefined) {
  const dataDiseaseList = {
    "@context": SCHEMA_URL_MICRODATA,
    "@type": "MedicalWebPage",
    about: {
      "@type": "MedicalCondition",
      name: [`${data?.title}`],
    },
    mainContentOfPage: ["Diagnosis", "Treatment"],
    audience: "http://schema.org/Patient",
    lastReviewed: data?.date
      ? `${formatDate(
          convertDateToEnglish(data.date),
          "yyyy-MM-dd'T'HH:mm"
        )}+08:00`
      : "",
    reviewedBy: data?.reviewedBy?.name || "",
    ...(data?.category.name && {
      specialty: `http://schema.org/${
        MEDICAL_SPECIALTY[data?.category.name as keyof KeyObjectTable]
      }`,
    }),
  };

  return [dataDiseaseList];
}

export function generateDiseaseDetailMicrodata(
  data: DiseaseDetail | undefined
) {
  const SEE_MORE = encodeHtml(
    `<a href="${ENV.SEHATQ_DOMAIN}${URLS.DISEASES}/${data?.slug}">Baca selengkapnya</a>`
  );
  const dataDiseaseDetail = {
    "@context": SCHEMA_URL_MICRODATA,
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Apa gejala dari ${data?.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${
            data?.symptom ? getFirstParagraf(data.symptom) : ""
          }. ${SEE_MORE}`,
        },
      },
      {
        "@type": "Question",
        name: `Apa penyebab dari ${data?.title || ""}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${
            data?.cause ? getFirstParagraf(data.cause) : ""
          }. ${SEE_MORE}`,
        },
      },
      {
        "@type": "Question",
        name: `Bagaimana cara mencegah ${data?.title || ""}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${
            data?.prevention ? getFirstParagraf(data.prevention) : ""
          }. ${SEE_MORE}`,
        },
      },
      {
        "@type": "Question",
        name: `Bagaimana cara mengobati ${data?.title || ""}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${
            data?.treatment ? getFirstParagraf(data.treatment) : ""
          }. ${SEE_MORE}`,
        },
      },
    ],
  };

  return [dataDiseaseDetail];
}

export function generateDiseaseMicrodata(args: DiseaseMicrodataArgs) {
  const microdata = [
    ...generateNewsDiseaseMicrodata(args.disease?.data, args.contentUrl),
    ...generateDiseaseListMicrodata(args.disease?.data),
    ...generateDiseaseDetailMicrodata(args.disease?.data),
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
