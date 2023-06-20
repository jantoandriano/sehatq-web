import React from "react";
import { ArticleCache, ArticleTag, useGetArticle } from "@sehatq/components";
import { ENV, SEO } from "@sehatq/constants";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";
import { generateArticleMicrodata } from "./article-microdata";

function selectArticleData(article: ArticleCache) {
  return article.data;
}

type ArticleHeadProps = {
  articleSlug: string;
};

export function ArticleHead(props: ArticleHeadProps) {
  const { articleSlug } = props;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/artikel/${articleSlug}`;

  const { SEO_DEFAULT } = SEO.SEHATQ;

  const { data: article, isSuccess } = useGetArticle(
    { articleSlug: `${articleSlug}` },
    { select: selectArticleData }
  );

  if (isSuccess && article) {
    const keywords: string =
      article.tags.map((tag: ArticleTag) => tag.name).join(",") ??
      SEO_DEFAULT.keywords;

    const imageDetail = article.image.url.split(".") ?? [];

    const seoContent: SEOContentProps = {
      title: article.headlineBait,
      description: article.meta ?? article.title,
      keywords: article.keyword ?? keywords,
      imageUrl: article.image?.url ?? SEO_DEFAULT.ogImageUrl,
      imageAlt: article.image?.alt ?? SEO_DEFAULT.ogImageAlt,
      imageType: imageDetail[imageDetail?.length - 1],
      imageWidth: "auto",
      imageHeight: "auto",
      author: article.author?.name ?? "",
      reviewer: article.reviewedBy?.name ?? "",
      modifiedTime: article.updatedDate ?? "",
      publishedTime: article.date ?? "",
    };

    const microdataProps = {
      articleSlug: `${articleSlug}`,
      article,
      rating: undefined,
    };
    const seoData = generateSEO({
      ogUrl: contentUrl,
      content: seoContent,
      canonicalUrl: contentUrl,
      robotIndex: SEO_DEFAULT.robotIndex,
      robotFollow: SEO_DEFAULT.robotFollow,
      microdata: generateArticleMicrodata(microdataProps),
      hasAmp: false,
    });

    return <HeadContent {...seoData} />;
  } else {
    return <HeadContent {...SEO_DEFAULT} />;
  }
}
