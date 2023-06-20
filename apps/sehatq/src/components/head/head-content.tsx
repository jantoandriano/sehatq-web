import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ENV, SEO } from "@sehatq/constants";

export type SEOData = {
  title: string;
  desc: string;
  keywords: string;
  author: string | undefined;
  reviewer: string;
  modifiedTime: string;
  publishedTime: string;
  canonicalUrl: string;
  ogLocale: string;
  ogTitle: string;
  ogDesc: string;
  ogType: string;
  ogSiteName: string;
  ogUrl: string;
  ogImage: string;
  ogImageUrl: string;
  ogImageType: string;
  ogImageWidth: string;
  ogImageHeight: string;
  ogImageAlt: string;
  ogTwitterCard: string;
  ogTwitterTitle: string;
  ogTwitterDesc: string;
  ogTwitterSite: string;
  next: string;
  prev: string;
  microdata?: JSX.Element[];
  hasAmp?: boolean;
  ampUrl?: string;
  robotFollow?: boolean;
  robotIndex?: boolean;
};

function generateRobotMetaTag(robots: string) {
  let content = "noindex, nofollow";
  if (
    ENV.ENVIRONMENT == "PRODUCTION" ||
    process.env.NODE_ENV === "development"
  ) {
    content = robots ? robots : "index, follow";
  }

  return <meta name="robots" content={content} />;
}

function generateIconTags() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        sizes="16x16"
        href="/images/favicon.ico?v=1.0"
      />
    </>
  );
}

function generateOGTags(seoContent: SEOData) {
  const {
    ogLocale,
    ogTitle,
    ogDesc,
    ogType,
    ogSiteName,
    ogUrl,
    ogImage,
    ogImageUrl,
    ogImageType,
    ogImageWidth,
    ogImageHeight,
    ogImageAlt,
    ogTwitterCard,
    ogTwitterTitle,
    ogTwitterDesc,
    ogTwitterSite,
  } = seoContent;
  return (
    <>
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:url" content={ogImageUrl} />
      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:twitter:card" content={ogTwitterCard} />
      <meta property="og:twitter:title" content={ogTwitterTitle} />
      <meta property="og:twitter:description" content={ogTwitterDesc} />
      <meta property="og:twitter:site" content={ogTwitterSite} />
    </>
  );
}

function generateArticlePublishedInfo(seoContent: SEOData) {
  const { author, reviewer, modifiedTime, publishedTime } = seoContent;
  return (
    <>
      {publishedTime && (
        <meta property="published_time" content={publishedTime} />
      )}
      {modifiedTime && <meta property="modified_time" content={modifiedTime} />}
      {author && (
        <>
          <meta property="og:author" content={author} />
          <meta name="content_author" content={author} />
        </>
      )}
      {reviewer && <meta name="content_reviewer" content={reviewer} />}
    </>
  );
}

export function HeadContent(props: SEOData) {
  const router = useRouter();
  const seoContent = props || SEO.SEHATQ.SEO_DEFAULT;
  const [, queryParams] = router.asPath.split("?");
  const queries = queryParams ? queryParams.split("&") : [];

  const {
    title,
    desc,
    keywords,
    canonicalUrl,
    next,
    prev,
    microdata,
    hasAmp,
    ampUrl,
    robotFollow: defaultRobotFollow,
    robotIndex: defaultRobotIndex,
  } = seoContent;

  const robotIndex = defaultRobotIndex ? queries.length === 0 : false;
  const robotFollow = defaultRobotFollow
    ? queries.length === 0 ||
      (queries.length === 1 && queries[0].includes("page="))
    : false;

  const robots = [
    robotIndex ? "index" : "noindex",
    robotFollow ? "follow" : "nofollow",
  ].join(", ");

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
      <meta httpEquiv="content-language" content="id-ID" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <meta name="google-site-verification" content={ENV.GSITE_VERIFICATION} />
      <meta
        name="facebook-domain-verification"
        content={ENV.FBDOMAIN_VERIFICATION}
      />
      <meta name="language" content="id" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no"
      />
      <meta name="theme-color" content="#70CBCF" />
      <meta property="fb:app_id" content={ENV.FB_ID} />
      <title>{title}</title>

      {/* META SEO */}
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />

      <link rel="canonical" href={canonicalUrl} />

      {next && <link rel="next" href={next} />}
      {prev && <link rel="prev" href={prev} />}

      {hasAmp && (
        <link
          rel="amphtml"
          href={ampUrl ?? `${canonicalUrl.split("?")[0]}/amp`}
        />
      )}

      {/* Article Published Info */}
      {generateArticlePublishedInfo(seoContent)}

      {/* ROBOTS */}
      {generateRobotMetaTag(robots)}

      {/* META OG */}
      {generateOGTags(seoContent)}

      {/* ICON */}
      {generateIconTags()}

      {/* Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SEO.SEHATQ.microdataGlobal),
        }}
      />
      {microdata ?? null}
    </Head>
  );
}
