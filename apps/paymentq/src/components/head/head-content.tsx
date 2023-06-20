import Head from "next/head";
import React from "react";
import { ENV, SEO } from "@sehatq/constants";

export type SEOData = {
  title: string;
  desc: string;
  keywords: string;
  author?: string | undefined;
  reviewer?: string;
  modifiedTime?: string;
  publishedTime?: string;
  canonicalUrl?: string;
  // not needed for current env
  // ogLocale: string;
  // ogTitle: string;
  // ogDesc: string;
  // ogType: string;
  // ogSiteName: string;
  // ogUrl: string;
  // ogImage: string;
  // ogImageUrl: string;
  // ogImageType: string;
  // ogImageWidth: string;
  // ogImageHeight: string;
  // ogImageAlt: string;
  // ogTwitterCard: string;
  // ogTwitterTitle: string;
  // ogTwitterDesc: string;
  // ogTwitterSite: string;
  next?: string;
  prev?: string;
  microdata?: JSX.Element[];
  hasAmp?: boolean;
  ampUrl?: string;
};

// function generateIconTags() {
//   return (
//     <>
//       <link
//         rel="apple-touch-icon"
//         sizes="180x180"
//         href="/images/apple-touch-icon.png"
//       />
//       <link
//         rel="icon"
//         type="image/png"
//         sizes="32x32"
//         href="/images/favicon-32x32.png"
//       />
//       <link
//         rel="icon"
//         type="image/png"
//         sizes="16x16"
//         href="/images/favicon-16x16.png"
//       />
//       <link
//         rel="shortcut icon"
//         type="image/x-icon"
//         sizes="16x16"
//         href="/images/favicon.ico?v=1.0"
//       />
//     </>
//   );
// }

// function generateOGTags(seoContent: SEOData) {
//   const {
//     ogLocale,
//     ogTitle,
//     ogDesc,
//     ogType,
//     ogSiteName,
//     ogUrl,
//     ogImage,
//     ogImageUrl,
//     ogImageType,
//     ogImageWidth,
//     ogImageHeight,
//     ogImageAlt,
//     ogTwitterCard,
//     ogTwitterTitle,
//     ogTwitterDesc,
//     ogTwitterSite,
//   } = seoContent;
//   return (
//     <>
//       <meta property="og:locale" content={ogLocale} />
//       <meta property="og:title" content={ogTitle} />
//       <meta property="og:description" content={ogDesc} />
//       <meta property="og:type" content={ogType} />
//       <meta property="og:site_name" content={ogSiteName} />
//       <meta property="og:url" content={ogUrl} />
//       <meta property="og:image" content={ogImage} />
//       <meta property="og:image:url" content={ogImageUrl} />
//       <meta property="og:image:type" content={ogImageType} />
//       <meta property="og:image:width" content={ogImageWidth} />
//       <meta property="og:image:height" content={ogImageHeight} />
//       <meta property="og:image:alt" content={ogImageAlt} />
//       <meta property="og:twitter:card" content={ogTwitterCard} />
//       <meta property="og:twitter:title" content={ogTwitterTitle} />
//       <meta property="og:twitter:description" content={ogTwitterDesc} />
//       <meta property="og:twitter:site" content={ogTwitterSite} />
//     </>
//   );
// }

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
  const seoContent = props || SEO.SEHATQ.SEO_DEFAULT;
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
  } = seoContent;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
      <meta httpEquiv="content-language" content="id-ID" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      {ENV.GSITE_VERIFICATION && (
        <meta
          name="google-site-verification"
          content={ENV.GSITE_VERIFICATION}
        />
      )}
      {ENV.FBDOMAIN_VERIFICATION && (
        <meta
          name="facebook-domain-verification"
          content={ENV.FBDOMAIN_VERIFICATION}
        />
      )}
      <meta name="language" content="id" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no"
      />
      <meta name="theme-color" content="#70CBCF" />
      {ENV.FB_ID && <meta property="fb:app_id" content={ENV.FB_ID} />}
      <title>{title}</title>
      <meta name="robots" content="noindex, nofollow" />

      {/* META SEO */}
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {next && <link rel="next" href={next} />}
      {prev && <link rel="prev" href={prev} />}

      {hasAmp && (
        <link
          rel="amphtml"
          href={
            ampUrl ?? `${!canonicalUrl ? "" : canonicalUrl.split("?")[0]}/amp`
          }
        />
      )}

      {/* Article Published Info */}
      {generateArticlePublishedInfo(seoContent)}

      {/* META OG */}
      {/* {generateOGTags(seoContent)} */}

      {/* ICON */}
      {/* {generateIconTags()} */}

      {/* Microdata */}
      {SEO.SEHATQ.microdataGlobal && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SEO.SEHATQ.microdataGlobal),
          }}
        />
      )}
      {microdata ?? null}

      <script
        dangerouslySetInnerHTML={{
          __html: `
                    (function(w, d, s, l, i) {
                      w[l] = w[l] || [];
                      w[l].push({
                        'gtm.start': new Date().getTime(),
                        event: 'gtm.js',
                      });
                      var f = d.getElementsByTagName(s)[0],
                        j = d.createElement(s),
                        dl = l != 'dataLayer' ? '&l=' + l : '';
                      j.async = true;
                      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl + '${
                        ENV.GTM_AUTH && "&gtm_auth=" + ENV.GTM_AUTH
                      }${
            ENV.GTM_PREVIEW && "&gtm_preview=" + ENV.GTM_PREVIEW
          }&gtm_cookies_win=x';
                      f.parentNode.insertBefore(j, f);
                    })(window, document, 'script', 'dataLayer', '${
                      ENV.GTM_ID
                    }');
                  `,
        }}
      />
    </Head>
  );
}
