import React from "react";
import { ENV, SEO, URLS } from "@sehatq/constants";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";

export function PediatricClinicHead() {
  const { SEO_DEFAULT } = SEO.SEHATQ;
  const url = `${ENV.SEHATQ_DOMAIN}${URLS.TELEMEDICINES}`;

  const title = "Informasi Kesehatan Anak dan Balita Terlengkap";
  const seoContent: SEOContentProps = {
    title,
    ogTitle: title,
    description:
      "Cari tahu informasi mengenai anak: pendidikan, tips parenting, hingga penyakit anak. Konsultasi segera melalui layanan chat dokter di SehatQ.",
    keywords:
      "dokter anak, konsultasi dokter anak, artikel untuk orang tua, tanya dokter gratis, tanya dokter online, chat dokter, aplikasi dokter, layanan kesehatan untuk anak, forum tentang orang tua",
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
