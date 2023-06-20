import { SCHEMA_URL_MICRODATA } from "@sehatq/constants";
import React from "react";

function generateNewsArticle(props: {
  pageUrl: string;
  headline: string;
  name: string;
  url: string;
  width: string;
  height: string;
  datePublished: string;
  dateModified: string;
  articleBody: string;
  description: string;
}) {
  return [
    {
      "@context": SCHEMA_URL_MICRODATA,
      "@type": "NewsArticle",
      mainEntityOfPage: {
        "@type": "MedicalWebPage",
        "@id": `${props.pageUrl}`,
      },
      pageUrl: props.url,
      headline: props.headline,
      name: props.name,
      datePublished: props.datePublished,
      dateModified: props.dateModified,
      publisher: {
        "@type": "Organization",
        name: "SehatQ",
        logo: {
          "@type": "ImageObject",
          url: "https://www.sehatq.com/public/assets/img/logo.png?v=05202011",
          width: "262",
          height: "75",
        },
      },
      articleBody: props.articleBody,
      description: props.description,
    },
  ];
}

function generatePhysician(data: {
  name: string;
  url: string;
  description: string;
  medicalSpecialty: string;
  imageUrl: string;
}) {
  const { name, url, description, medicalSpecialty, imageUrl } = data;
  return [
    {
      "@context": SCHEMA_URL_MICRODATA,
      "@type": "Physician",
      name,
      url,
      description,
      medicalSpecialty,
      priceRange: "-",
      telephone: "-",
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
      address: "-",
    },
  ];
}

export type HCPMicrodataArgs = {
  newsArticle: {
    pageUrl: string;
    headline: string;
    name: string;
    url: string;
    width: string;
    height: string;
    datePublished: string;
    dateModified: string;
    articleBody: string;
    description: string;
  };
  physician: {
    name: string;
    url: string;
    description: string;
    medicalSpecialty: string;
    imageUrl: string;
  };
};

export function generateHCPMicrodata(args: HCPMicrodataArgs) {
  const microdata = [
    ...generateNewsArticle(args.newsArticle),
    ...generatePhysician(args.physician),
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
