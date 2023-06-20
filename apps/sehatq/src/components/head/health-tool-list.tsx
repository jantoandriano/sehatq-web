import React from "react";
import { ENV, SEO } from "@sehatq/constants";
import { useGetHealthToolSEO } from "@sehatq/components";
import { useRouter } from "next/router";
import { HeadContent } from "./head-content";
import { generateHealthToolListMicrodata } from "./health-tool-list-microdata";

export function HealthToolListHead() {
  const router = useRouter();
  const pathUrl = router.asPath;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}${pathUrl}`;

  const { SEO_DEFAULT } = SEO.SEHATQ;

  const { data } = useGetHealthToolSEO({
    slug: "tes-kesehatan",
  });

  const seoContent = {
    title:
      data?.metaTitle ||
      "Tes dan Cek Kesehatan Anda dengan Alat Kesehatan Online SehatQ",
    desc:
      data?.metaDescription ||
      "Tes kesehatan rutin kini dapat Anda lakukan dengan alat kesehatan online secara gratis dan praktis. Temukan kalkulator BMI dan cek syarat menerima vaksin Covid-19 di SehatQ.",
    keywords:
      data?.keywords ||
      "tes kesehatan, tes kesehatan mental, tes kesehatan mata, tes kesehatan sebelum menikah, cek kesehatan",
    ogImageAlt: "Tes kesehatan di SehatQ",
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
    microdata: generateHealthToolListMicrodata(),
  };

  return <HeadContent {...seoData} />;
}
