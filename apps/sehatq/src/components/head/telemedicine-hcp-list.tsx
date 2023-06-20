import React from "react";
import { ENV, SEO } from "@sehatq/constants";
import { useRouter } from "next/router";
import { slugToName } from "@sehatq/utils";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";
import { telemedicineHCPListMicrodata } from "./telemedicine-hcp-list-microdata";

export function TelemedicineHCPListHead() {
  const router = useRouter();
  let contentUrl = `${ENV.SEHATQ_DOMAIN}/spesialis`;
  const { slugs = [] } = router.query;
  const [specialitySlug] = slugs as string[];
  const { SEO_DEFAULT } = SEO.SEHATQ;

  let specialityName = "";
  if (specialitySlug) {
    contentUrl = `${contentUrl}/${specialitySlug}`;
    specialityName = slugToName(specialitySlug);
  }
  const nonSpeciality = ["umum", "psikolog"];
  let specialityTextTitle = "Spesialis";
  if (specialitySlug) {
    specialityTextTitle = nonSpeciality.includes(specialitySlug as string)
      ? specialityName
      : `Spesialis ${specialityName}`;
  }
  const title = `Dokter ${specialityTextTitle}: Tanya Dokter, Konsultasi, Chat Online | SehatQ`;

  let specialityText = "spesialis";
  if (specialitySlug) {
    specialityText = nonSpeciality.includes(specialitySlug as string)
      ? specialityName
      : `spesialis ${specialityName}`;
  }
  const description = `Tanya dokter ${specialityText} mengenai gejala penyakit melalui layanan Telemedicine SehatQ. Konsultasi dokter ${specialityText} dengan fitur Video Call dan Chat Dokter.`;

  const seoContent: SEOContentProps = {
    ...SEO_DEFAULT,
    ogType: "website",
    title,
    ogTitle: title,
    ogTwitterTitle: title,
    description,
    ogTwitterDesc: description,
    keywords:
      "konsultasi dokter, konsultasi dokter online, konsul dokter online, konsultasi dokter kandungan, tanya dokter gratis, tanya dokter online, konsultasi dokter kulit, chat dokter, aplikasi dokter",
    imageAlt: "SehatQ sebagai asisten kesehatan keluarga Anda",
  };

  const seoData = generateSEO({
    ogUrl: contentUrl,
    content: seoContent,
    canonicalUrl: contentUrl,
    robotIndex: SEO_DEFAULT.robotIndex,
    robotFollow: SEO_DEFAULT.robotFollow,
    microdata: telemedicineHCPListMicrodata(specialitySlug),
  });

  return <HeadContent {...seoData} />;
}
