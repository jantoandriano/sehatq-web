import { ENV, SCHEMA_URL_MICRODATA } from "@sehatq/constants";
import React from "react";
import { generateBreadcrumbMicrodata } from "./microdata-helpers";

type LocalBusinessData = {
  name: string;
  imageUrl: string;
  imageWidth: string;
  imageHeight: string;
  areaServed: string;
  openingHours: string;
  addressLocality: string;
  addressRegion: string;
  streetAddress: string;
  latitude: number;
  longitude: number;
  hasMap: string;
  priceRange: string;
  telephone: string;
  offers: {
    id: number;
    name: string;
    imageUrl: string;
  }[];
  catalogOfferName: string;
  hcfType: string;
};

type HospitalData = {
  image: string;
  url: string;
  name: string;
  streetAddress: string;
  addressLocality: string;
  regionId: string;
  ratingValue: number;
  latitude: number;
  longitude: number;
  telephone: string;
  openingHoursSpecification:
    | {
        days: (string | null)[];
        startHour: string;
        endHour: string;
      }[]
    | null;
};

export type HCFMicrodataArgs = {
  contentUrl: string;
  hcfName: string;
  localBusiness: LocalBusinessData;
  hospital: HospitalData;
};

function localBusinessMicrodata(data: LocalBusinessData) {
  const {
    name,
    imageUrl,
    imageWidth,
    imageHeight,
    areaServed,
    openingHours,
    addressLocality,
    addressRegion,
    streetAddress,
    latitude,
    longitude,
    hasMap,
    priceRange,
    telephone,
    offers,
    catalogOfferName,
    hcfType,
  } = data;

  const itemsOffered =
    offers && offers.length
      ? offers.map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.name,
          },
        }))
      : [];

  const dataLocalBusiness = {
    "@context": "http://schema.org/",
    "@type": "LocalBusiness",
    name,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: imageWidth,
      height: imageHeight,
    },
    areaServed: {
      "@type": "State",
      name: areaServed,
    },
    openingHours,
    address: {
      "@type": "PostalAddress",
      addressLocality,
      addressRegion,
      streetAddress,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    hasMap,
    priceRange,
    telephone,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: catalogOfferName,
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: `${hcfType}`,
          itemListElement: itemsOffered,
        },
      ],
    },
  };
  return [dataLocalBusiness];
}

function hospitalMicrodata(data: HospitalData) {
  const {
    image,
    url,
    name,
    streetAddress,
    addressLocality,
    regionId,
    ratingValue,
    latitude,
    longitude,
    telephone,
    openingHoursSpecification,
  } = data;

  const dataHospital = {
    "@context": SCHEMA_URL_MICRODATA,
    "@type": "Hospital",
    "@id": url,
    image,
    name,
    priceRange: "0",
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion: `${regionId}`,
      addressCountry: `${regionId}`,
    },
    ...(Number(ratingValue) && {
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue,
        },
        author: {
          "@type": "Person",
          name: "Tim SehatQ",
        },
      },
    }),
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    telephone,
    ...(openingHoursSpecification && {
      openingHoursSpecification: openingHoursSpecification.map((item) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: item.days,
        opens: item.startHour,
        closes: item.endHour,
      })),
    }),
  };
  return [dataHospital];
}

export function generateHCFMicrodata(args: HCFMicrodataArgs) {
  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: `${ENV.SEHATQ_DOMAIN}/layanan-kesehatan`,
      name: "Daftar Layanan Kesehatan",
    },
    {
      id: args.contentUrl,
      name: args.hcfName,
    },
  ];
  const microdata = [
    ...generateBreadcrumbMicrodata(breadCrumb),
    ...localBusinessMicrodata(args.localBusiness),
    ...hospitalMicrodata(args.hospital),
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
