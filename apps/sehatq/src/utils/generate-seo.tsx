import { SEO } from "@sehatq/constants";
export type SEOContentProps = {
  title: string;
  ogTitle?: string;
  description: string;
  keywords: string;
  imageUrl?: string;
  imageAlt?: string;
  imageType?: string;
  imageWidth?: string;
  imageHeight?: string;
  author?: string;
  reviewer?: string;
  modifiedTime?: string;
  publishedTime?: string;
  ogType?: string;
  ogTwitterTitle?: string;
  ogTwitterDesc?: string;
};

export type GenerateSEOProps = {
  content: SEOContentProps;
  robotIndex?: boolean;
  robotFollow?: boolean;
  ogUrl: string;
  canonicalUrl: string;
  next?: string;
  prev?: string;
  microdata?: JSX.Element[];
  hasAmp?: boolean;
  ampUrl?: string;
};

export function generateSEO(props: GenerateSEOProps) {
  const { SEO_DEFAULT } = SEO.SEHATQ;
  const {
    content,
    ogUrl,
    canonicalUrl,
    next = "",
    prev = "",
    microdata,
    hasAmp,
    ampUrl,
    robotIndex,
    robotFollow,
  } = props;
  const {
    title,
    ogTitle,
    description,
    keywords,
    imageUrl,
    imageAlt,
    imageType = "",
    imageWidth = "",
    imageHeight = "",
    author = "",
    reviewer = "",
    modifiedTime = "",
    publishedTime = "",
    ogType = "",
    ogTwitterTitle = "",
    ogTwitterDesc = "",
  } = content;

  return {
    ...SEO_DEFAULT,
    ogType: ogType ?? "Article",
    ...(title && {
      title: title,
      ogTitle: ogTitle || `${title} | SehatQ`,
      ogTwitterTitle: ogTwitterTitle || ogTitle,
    }),
    ...(description && {
      desc: description,
      ogDesc: description,
      ogTwitterDesc: ogTwitterDesc || description,
    }),
    ...(keywords && { keywords }),
    ...(imageUrl && {
      ogImage: imageUrl,
      ogImageUrl: imageUrl,
    }),
    ...(imageAlt && { ogImageAlt: imageAlt }),
    imageType,
    imageWidth,
    imageHeight,
    ogUrl,
    canonicalUrl,
    author,
    reviewer,
    modifiedTime,
    publishedTime,
    robotIndex,
    robotFollow,
    next,
    prev,
    microdata,
    hasAmp,
    ampUrl,
  };
}
