import React from "react";
import { useGetDiseaseSEO } from "@sehatq/components";
import { ENV, SEO, URLS } from "@sehatq/constants";
import { useRouter } from "next/router";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";
import { generateDiseaseMicrodata } from "./diseases-microdata";

type InitSeoStaticListPage = {
  slug: string;
  subSlug: string;
  categoryName: string;
  firstChar: string;
};

export function initSeoStaticListPage({
  slug,
  subSlug,
  categoryName,
  firstChar,
}: InitSeoStaticListPage) {
  const urlSlug = !subSlug ? `/${slug}` : `/${slug}/${subSlug}`;

  const url = `${ENV.SEHATQ_DOMAIN}${URLS.DISEASES}${urlSlug}`;
  const titleCategory = categoryName ? ` ${categoryName}` : "";
  const titleFirstChar = firstChar
    ? ` dari huruf ${firstChar.toUpperCase()}`
    : "";
  const descFirstChar = firstChar
    ? categoryName
      ? ` yang diawali dari huruf ${firstChar.toUpperCase()}`
      : ` diawali dari huruf ${firstChar.toUpperCase()}`
    : "";
  return { urlSlug, url, titleCategory, titleFirstChar, descFirstChar };
}

export function slugToPhrase(phrase = "") {
  return phrase
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, (a) => a.toUpperCase());
}

export function DiseasesHead() {
  const router = useRouter();
  const { slugs = [] } = router.query;
  const categorySlug = slugs?.[0]?.length > 1 ? slugs[0] : "";
  const firstChar = slugs?.[0]?.length === 1 ? slugs[0] : slugs[1] ?? "";

  const { data: diseaseSEO } = useGetDiseaseSEO(
    { slug: categorySlug },
    { enabled: !!categorySlug }
  );

  const { SEO_DEFAULT } = SEO.SEHATQ;

  let title = `Definisi Penyakit, Gejala, Penyebab, Diagnosis, Pengobatan, Pencegahan | SehatQ`;
  let description = `Daftar penyakit terlengkap disertai dengan definisi, gejala, penyebab, diagnosis, pengobatan, dan pencegahan penyakit, serta tips konsultasi dengan dokter.`;
  const keywords = `ciri-ciri penyakit, penyebab penyakit, gejala penyakit, konsultasi dokter, tanya jawab dokter, diagnosis penyakit, pengobatan, solusi kesehatan, praktek dokter, jaga kesehatan, kesehatan keluarga`;
  const imageAlt =
    "Pencegahan dan pengobatan penyakit terlengkap hanya di SehatQ";
  if (slugs.length) {
    const { url, titleCategory, titleFirstChar, descFirstChar } =
      initSeoStaticListPage({
        slug: categorySlug,
        subSlug: slugs[1] ? slugs[1] : "",
        categoryName: slugToPhrase(categorySlug),
        firstChar: firstChar,
      });

    title = `Daftar Penyakit${titleCategory}${titleFirstChar} | SehatQ`;
    description = `Daftar penyakit${titleCategory}${descFirstChar}`;
    description +=
      " - Definisi, gejala, penyebab, diagnosis, pengobatan, dan pencegahan penyakit, serta tips konsultasi dengan dokter.";

    const seoContent: SEOContentProps = {
      title: diseaseSEO?.metaTitle || title,
      ogTitle: diseaseSEO?.metaTitle || title,
      description: diseaseSEO?.metaDescription || description,
      keywords: diseaseSEO?.keyword || keywords,
      imageAlt,
      ogType: "website",
    };

    const seoData = generateSEO({
      ogUrl: url,
      robotIndex: true,
      robotFollow: true,
      canonicalUrl: url,
      content: seoContent,
      microdata: generateDiseaseMicrodata(),
    });

    return <HeadContent {...seoData} />;
  } else {
    const seoData = {
      ...SEO_DEFAULT,
      title,
      keywords,
      ogTitle: title,
      robotIndex: true,
      robotFollow: true,
      ogType: "website",
      desc: description,
      ogDesc: description,
      ogImageAlt: imageAlt,
      ogTwitterTitle: title,
      ogTwitterDesc: description,
      ogUrl: ENV.SEHATQ_DOMAIN + URLS.DISEASES,
      canonicalUrl: ENV.SEHATQ_DOMAIN + URLS.DISEASES,
      microdata: generateDiseaseMicrodata(),
    };
    return <HeadContent {...seoData} />;
  }
}
