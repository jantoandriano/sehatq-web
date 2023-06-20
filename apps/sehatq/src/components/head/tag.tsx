import React from "react";
import {
  ArticlesCache,
  TagSEOCache,
  useGetArticles,
  useGetTagSEO,
} from "@sehatq/components";
import { ENV, SEO } from "@sehatq/constants";
import { useRouter } from "next/router";
import { slugToName } from "@sehatq/utils";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";
import { generateTagMicrodata } from "./tag-microdata";

function selectTagSeo(tag: TagSEOCache) {
  return tag;
}

function selectArticleTag(article: ArticlesCache) {
  return article.data;
}

export function TagHead() {
  const router = useRouter();
  const { tagSlug } = router.query;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/tag/${tagSlug}`;

  const { SEO_DEFAULT } = SEO.SEHATQ;

  const query = {
    tagSlug: `${tagSlug}`,
  };
  const { data: tagSeo, isSuccess } = useGetTagSEO(query, {
    select: selectTagSeo,
  });

  const articleQuery = {
    page: "1",
    perPage: "3",
    categoryId: "",
    categorySlug: "",
    tagSlug: `${tagSlug}`,
  };

  let additionalHeadSEO = { robotFollow: true, robotIndex: true };
  if (query.tagSlug.substring(0, 4) === "adv-") {
    additionalHeadSEO = { ...additionalHeadSEO, robotIndex: false };
  }

  const { data: articles } = useGetArticles(articleQuery, {
    select: selectArticleTag,
  });

  if (isSuccess && tagSeo) {
    const keywords: string = slugToName(`${tagSlug}`);

    const seoContent: SEOContentProps = {
      title: tagSeo.metaTitle,
      description: tagSeo.metaDescription ?? tagSeo.metaTitle,
      keywords: tagSeo.keywords ?? keywords,
      imageWidth: "auto",
      imageHeight: "auto",
    };

    const microdataProps = {
      tagSlug: `${tagSlug}`,
      articles: articles ?? [],
    };
    const seoData = generateSEO({
      content: seoContent,
      ogUrl: contentUrl,
      canonicalUrl: contentUrl,
      microdata: generateTagMicrodata(microdataProps),
      hasAmp: false,
    });

    return <HeadContent {...seoData} {...additionalHeadSEO} />;
  } else {
    return <HeadContent {...SEO_DEFAULT} {...additionalHeadSEO} />;
  }
}
