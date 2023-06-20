import React from "react";
import { ENV, SEO, URLS } from "@sehatq/constants";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";

export function InternistClinicHead() {
  const { SEO_DEFAULT } = SEO.SEHATQ;
  const url = `${ENV.SEHATQ_DOMAIN}${URLS.TELEMEDICINES}`;

  const title = "Layanan Kesehatan Penyakit Dalam Internist Online";
  const seoContent: SEOContentProps = {
    title,
    ogTitle: title,
    description:
      "Cari tahu informasi mengenai penyakit dalam: gejala hingga upaya pengobatan. Konsultasi segera melalui layanan chat dokter di SehatQ",
    keywords:
      "dokter penyakit dalam, konsultasi dokter penyakit dalam, artikel tentang penyakit dalam, tanya dokter gratis, tanya dokter online, chat dokter, aplikasi dokter, layanan kesehatan untuk penyakit dalam, forum tentang penyakit dalam",
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
