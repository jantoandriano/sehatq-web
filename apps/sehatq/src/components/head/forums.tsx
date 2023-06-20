import React from "react";

import { ENV, SEO } from "@sehatq/constants";
import { useRouter } from "next/router";
import {
  ForumsCache,
  useGetCategoryData,
  useGetForums,
} from "@sehatq/components";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";

import { generateForumsMicrodata } from "./forums-microdata";
import { generateSeoPaggination } from "./microdata-helpers";

function selectForums(cache: ForumsCache) {
  return cache.data;
}

function selectMetaForums(cache: ForumsCache) {
  return cache.meta;
}

export function ForumsHead() {
  const router = useRouter();
  const { slugs = [], page, perPage, sort, q = "" } = router.query;
  const [categorySlug] = slugs as string[];
  const categoryPath: string = categorySlug ? `/${categorySlug}` : "";
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/forum${categoryPath}`;

  const { SEO_DEFAULT } = SEO.SEHATQ;

  const category = useGetCategoryData(categorySlug);

  const queryForums = {
    page: page ? `${page}` : "1",
    perPage: perPage ? `${perPage}` : "10",
    categoryId: categorySlug ?? "",
    sortBy: (sort as string) || "newest",
    query: `${q}`,
    answered: "true",
  };

  const { data: forums, isSuccess } = useGetForums(queryForums, {
    select: selectForums,
  });

  const { data: meta } = useGetForums(queryForums, {
    select: selectMetaForums,
  });

  if (isSuccess && forums) {
    const seoPagination = generateSeoPaggination(
      Number(`${page}`),
      meta?.pagination.maxPage ?? 0,
      contentUrl
    );

    let titlePage = "";
    let descPage = "";

    if (meta?.pagination?.current && meta?.pagination?.current >= 2) {
      titlePage = `Page ${meta.pagination.current} `;
      descPage = ` - Page ${meta.pagination.current}`;
    }

    let title = `Forum Kesehatan dan Tanya Jawab Dokter Online ${titlePage}| SehatQ`;
    let ogTitle = `Forum Tanya Jawab Online Seputar Dunia Kesehatan ${titlePage}| SehatQ`;
    let description = `Tanya jawab dokter online, diskusi seputar kesehatan keluarga, tumbuh kembang anak, kehamilan, pola hidup sehat di forum SehatQ${descPage}.`;

    if (category) {
      title = `Diskusi Kesehatan Terkait ${category.name} di Forum Tanya Jawab Dokter ${titlePage}`;
      ogTitle = `Diskusi Kesehatan Terkait ${category.name} di Forum Tanya Jawab Dokter ${titlePage}`;
      description = `Forum tanya jawab dokter seputar ${category.name}. Ajukan pertanyaan terkait keluhan kesehatan Anda di forum diskusi SehatQ${descPage}.`;
    }

    const seoContent: SEOContentProps = {
      title,
      ogTitle,
      ogTwitterTitle: title,
      description,
      keywords:
        "Sistem informasi kesehatan, bpjs kesehatan, diskusi penyakit, pola hidup sehat, tips kesehatan, info kesehatan, tips sehat, gejala penyakit, pengobatan, obat herbal, informasi obat, berita kesehatan",
      ogType: "website",
    };

    const seoData = generateSEO({
      ogUrl: contentUrl,
      content: seoContent,
      canonicalUrl: contentUrl,
      robotIndex: SEO_DEFAULT.robotIndex,
      robotFollow: SEO_DEFAULT.robotFollow,
      microdata: generateForumsMicrodata({
        category,
        forums,
      }),
      next: seoPagination.next,
      prev: seoPagination.prev,
      hasAmp: false,
    });

    return <HeadContent {...seoData} />;
  } else {
    return <HeadContent {...SEO_DEFAULT} />;
  }
}
