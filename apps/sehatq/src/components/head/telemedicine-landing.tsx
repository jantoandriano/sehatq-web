import React from "react";
import { ENV, SEO, URLS } from "@sehatq/constants";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";
import { generateTelemedicineLandingMicrodata } from "./telemedicine-landing-microdata";

export function TelemedicineLandingHead() {
  const { SEO_DEFAULT } = SEO.SEHATQ;
  const url = `${ENV.SEHATQ_DOMAIN}${URLS.TELEMEDICINES}`;

  const title = "Tanya Dokter dan Chat Dokter Online | SehatQ";
  const seoContent: SEOContentProps = {
    title,
    ogTitle: title,
    description:
      "Tanya dokter online melalui layanan Telemedicine SehatQ. Konsultasi dokter spesialis dan dokter umum dengan fitur Video Call dan Chat Dokter.",
    keywords:
      "konsultasi dokter, konsultasi dokter online, konsul dokter online, konsultasi dokter kandungan, tanya dokter gratis, tanya dokter online, konsultasi dokter kulit, chat dokter, aplikasi dokter",
    ogType: "website",
  };

  const seoData = generateSEO({
    ogUrl: url,
    canonicalUrl: url,
    content: seoContent,
    robotIndex: SEO_DEFAULT.robotIndex,
    robotFollow: SEO_DEFAULT.robotFollow,
    microdata: generateTelemedicineLandingMicrodata(),
    hasAmp: false,
  });

  const contentSeo = {
    ...SEO_DEFAULT,
    ...seoData,
  };

  return <HeadContent {...contentSeo} />;
}
