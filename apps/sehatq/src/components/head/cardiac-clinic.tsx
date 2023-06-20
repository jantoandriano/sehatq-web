import React from "react";
import { ENV, SEO, URLS } from "@sehatq/constants";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";

export function CardiacClinicHead() {
  const { SEO_DEFAULT } = SEO.SEHATQ;
  const url = `${ENV.SEHATQ_DOMAIN}${URLS.TELEMEDICINES}`;

  const title = "Layanan Kesehatan Jantung Online - Spesialis Kardiologi";
  const seoContent: SEOContentProps = {
    title,
    ogTitle: title,
    description:
      "Cari tahu informasi mengenai jantung: tips merawat hingga mengobati penyakit jantung. Konsultasi segera melalui layanan chat dokter di SehatQ",
    keywords:
      "dokter spesialis jantung, konsultasi dokter spesialis jantung, artikel tentang kesehatan jantung, tanya dokter gratis, tanya dokter online, chat dokter, aplikasi dokter, layanan kesehatan jantung, forum tentang kesehatan jantung",
    ogType: "website",
  };

  const seoData = generateSEO({
    ogUrl: url,
    canonicalUrl: url,
    content: seoContent,
    robotIndex: SEO_DEFAULT.robotIndex,
    robotFollow: SEO_DEFAULT.robotFollow,
    hasAmp: false,
  });

  const contentSeo = {
    ...SEO_DEFAULT,
    ...seoData,
  };

  return <HeadContent {...contentSeo} />;
}
