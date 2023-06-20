import React from "react";
import { ENV, SEO } from "@sehatq/constants";
import { HeadContent } from "./head-content";

export function MentalHealthFormHead() {
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/tes-kesehatan/tes-kesehatan-mental/`;

  const { SEO_DEFAULT } = SEO.SEHATQ;

  const seoContent = {
    title:
      "Tes Kesehatan Mental Online, Hindari Risiko Depresi Sejak Dini | SehatQ",
    desc: "Cek kondisi kesehatan mental online. Risiko depresi bisa muncul tanpa disadari, kapan saja dan dimana saja. Gangguan emosi dan fisik bisa saja terjadi, begitu juga dengan penurunan fungsi saat bekerja dan di rumah. Hindari risiko depresi sejak dini dengan tes kesehatan mental SehatQ.",
    keywords:
      "depresi mayor, gangguan depresi, kesehatan mental, tes kesehatan mental, cek kesehatan mental",
    ogImageAlt: "Tes kesehatan mental",
  };

  const seoData = {
    ...SEO_DEFAULT,
    ...seoContent,
    ogTitle: seoContent.title,
    ogTwitterTitle: seoContent.title,
    ogDesc: seoContent.desc,
    ogTwitterDesc: seoContent.desc,
    ogUrl: contentUrl,
    canonicalUrl: contentUrl,
  };

  return <HeadContent {...seoData} robotFollow={true} robotIndex={false} />;
}
