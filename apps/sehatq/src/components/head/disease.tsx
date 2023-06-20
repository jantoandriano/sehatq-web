import React from "react";
import { useGetDiseaseDetail } from "@sehatq/components";
import { ENV, SEO, URLS } from "@sehatq/constants";
import { useRouter } from "next/router";
import { HeadContent } from "./head-content";
import { generateDiseaseMicrodata } from "./disease-microdata";

const TITLE = "| Tanda dan Gejala, Penyebab, Cara Mengobati, Cara Mencegah";
const DEFAULT_AUTHOR = {
  id: 0,
  name: "Tim SehatQ",
  slug: "",
  imageUrl: "https://static.sehatq.com/web/assets/img/avatar-default.png?v=6",
  biograph:
    "We as a medical expert reviews every contents that's gonna publish in SehatQ to assure that everything come out from us is the most valid and the best health content you can find in Indonesia.",
};

export function DiseaseHead() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: disease } = useGetDiseaseDetail({
    diseaseSlug: slug as string,
  });

  const { SEO_DEFAULT } = SEO.SEHATQ;
  const url = `${ENV.SEHATQ_DOMAIN}${URLS.DISEASES}/${slug}`;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/penyakit/${slug}`;

  const headlineBait = {
    disease,
    contentUrl,
  };

  const seoData = {
    ...SEO_DEFAULT,
    title: `${disease?.data.title ?? ""} ${TITLE}`,
    desc: disease?.data.meta || "",
    keywords: disease?.data.keyword || "",
    canonicalUrl: url,
    ogTitle: `${disease?.data.title ?? ""} ${TITLE}`,
    ogDesc: disease?.data.meta || "",
    ogType: "article",
    ogUrl: url,
    ogImage: disease?.data.images[0].url || "",
    ogImageUrl: disease?.data.images[0].url || "",
    ogImageAlt: disease?.data.images[0].alt || "",
    ogImageHeight: "780",
    ogImageWidth: "420",
    ogTwitterDesc: disease?.data.meta || "",
    ogTwitterTitle: `${disease?.data.title ?? ""} ${TITLE}`,
    author: disease?.data.author.name || DEFAULT_AUTHOR.name,
    ...(disease?.data.reviewedBy && {
      reviewer: disease?.data.reviewedBy.name,
    }),

    microdata: generateDiseaseMicrodata(headlineBait),
  };
  return <HeadContent {...seoData} />;
}
