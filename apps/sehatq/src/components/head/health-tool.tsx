import React from "react";
import { ENV, SEO } from "@sehatq/constants";
import {
  useGetHealthToolSEO,
  useGetHealthToolDetail,
} from "@sehatq/components";
import { useRouter } from "next/router";
import { HeadContent } from "./head-content";
import { generateHealthToolMicrodata } from "./health-tool-microdata";

export function HealthToolHead() {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const pathUrl = router.asPath;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}${pathUrl}`;

  const { SEO_DEFAULT } = SEO.SEHATQ;

  const { data: healthToolSEO } = useGetHealthToolSEO({
    slug,
  });
  const { data: healthTool, isSuccess: isSuccessDetail } =
    useGetHealthToolDetail({
      idOrSlugOrFormcode: slug,
    });

  if (isSuccessDetail) {
    const seoData = {
      ...SEO_DEFAULT,
      title:
        healthToolSEO?.metaTitle ||
        "Tes dan Cek Kesehatan Anda dengan Alat Kesehatan Online SehatQ",
      desc:
        healthToolSEO?.metaDescription ||
        "Tes kesehatan rutin kini dapat Anda lakukan dengan alat kesehatan online secara gratis dan praktis. Temukan kalkulator BMI dan cek syarat menerima vaksin Covid-19 di SehatQ.",
      keywords:
        healthToolSEO?.keywords ||
        "tes kesehatan, tes kesehatan mental, tes kesehatan mata, tes kesehatan sebelum menikah, cek kesehatan",
      ogType: "website",
      ogUrl: contentUrl,
      microdata: generateHealthToolMicrodata(slug, healthTool?.data.name ?? ""),
    };
    return <HeadContent {...seoData} />;
  } else {
    return <HeadContent {...SEO_DEFAULT} />;
  }
}
