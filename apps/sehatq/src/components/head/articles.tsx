import React from "react";
import { ArticlesCache, useGetArticles } from "@sehatq/components";
import { ENV, SEO } from "@sehatq/constants";
import { useRouter } from "next/router";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";
import { generateArticlesMicrodata } from "./articles-microdata";
import { generateSeoPaggination } from "./microdata-helpers";

function selectArticlesData(articles: ArticlesCache) {
  return articles;
}

function generatePaginationText(page: string) {
  if (page && Number(page) >= 2) {
    return {
      url: `?page=${page}`,
      title: `Page ${page} `,
      desc: ` - Page ${page}`,
    };
  }
  return null;
}

function generateSeoOGUrl(slug: string, baseUrl: string, pageUrl: string) {
  return slug
    ? `${baseUrl}/artikel/${slug}${pageUrl}`
    : `${baseUrl}/artikel${pageUrl}`;
}

export function ArticlesHead() {
  const router = useRouter();
  const { slugs = [], page, perPage } = router.query;
  const [categorySlug] = slugs as string[];

  const { SEO_DEFAULT } = SEO.SEHATQ;

  // get articles
  const { data: articles, isSuccess } = useGetArticles(
    {
      page: page ? `${page}` : "1",
      perPage: perPage ? `${perPage}` : "10",
      categorySlug,
      categoryId: "",
      tagSlug: "",
    },
    { select: selectArticlesData }
  );

  const category = articles?.meta.filter.categories.find(
    (cat) => cat.slug === categorySlug
  );

  if (isSuccess && articles) {
    const paginationText = generatePaginationText(page ? `${page}` : "1");

    const url = generateSeoOGUrl(
      categorySlug,
      ENV.SEHATQ_DOMAIN,
      paginationText?.url ?? ""
    );

    let title = `Daftar Artikel Kesehatan dan Tips Keluarga Sehat ${
      paginationText?.title ?? ""
    }`;
    let desc = `Daftar artikel info kesehatan terlengkap dan terpercaya. Lindungi kesehatan keluarga Anda dengan tips dan trik kesehatan harian dari SehatQ.${
      paginationText?.desc ?? ""
    }`;

    if (category) {
      title = `Artikel Kesehatan Seputar ${category.name} ${
        paginationText?.title ?? ""
      }`;
      desc = `Daftar artikel info kesehatan seputar ${category.name.toLowerCase()} terlengkap dan terpercaya. Lindungi kesehatan keluarga Anda dengan tips dan trik kesehatan harian dari SehatQ.${
        paginationText?.desc ?? ""
      }`;
    }

    const seoContent: SEOContentProps = {
      ...SEO_DEFAULT,
      title,
      ogTitle: title,
      description: desc,
      keywords:
        "kesehatan bayi dan ibu menyusui, MPASI, masalah dan tips kehamilan, kesehatan lansia, kesehatan wanita dan pria, diet sehat, olahraga, gaya hidup sehat, gangguan pola tidur, kesehatan hubungan suami-istri, definisi penyakit dan cara pencegahan, kesehatan mental, kesehatan kulit, cedera saat berolahraga, BPJS Kesehatan, Info kesehatan",
    };

    const pathSlug: string = categorySlug ? `/${categorySlug}` : "";
    const seoPagination = generateSeoPaggination(
      Number(`${page}`),
      articles.meta.pagination.maxPage,
      `${ENV.SEHATQ_DOMAIN}/artikel${pathSlug}`
    );

    const microdataProps = {
      category,
      articles,
    };

    const seoData = generateSEO({
      ogUrl: url,
      canonicalUrl: url,
      content: seoContent,
      next: seoPagination.next,
      prev: seoPagination.prev,
      robotIndex: SEO_DEFAULT.robotIndex,
      robotFollow: SEO_DEFAULT.robotFollow,
      microdata: generateArticlesMicrodata(microdataProps),
      hasAmp: false,
    });

    return <HeadContent {...seoData} />;
  }

  return <HeadContent {...SEO_DEFAULT} />;
}
