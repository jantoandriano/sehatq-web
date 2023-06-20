import { Article, ArticleRating } from "@sehatq/components";
import { ENV, URLS, SCHEMA_URL_MICRODATA } from "@sehatq/constants";
import { formatDate, parseToDate } from "@sehatq/utils";

export interface ArticleRatingMicrodata {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  aggregateRating?: {
    "@type": string;
    ratingValue: number;
    bestRating: number;
    worstRating: number;
    ratingCount: number;
  };
}

export function generateArticleDetailMicrodata(
  data: Article,
  contentUrl: string
) {
  const { headlineBait, meta, author, publishDate, modifiedDate, image } = data;

  const authorUrl = `${ENV.SEHATQ_DOMAIN}${URLS.AUTHOR.replace(
    "[slug]",
    author?.slug ?? ""
  )}`;

  const datetimeFormat = "yyyy-MM-dd'T'HH:mm:ssxxx";

  const dataNewsArticle = {
    "@context": SCHEMA_URL_MICRODATA,
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "MedicalWebPage",
      "@id": `${contentUrl}`,
    },
    headline: headlineBait,
    image: [image.url],
    datePublished: formatDate(
      parseToDate(publishDate, "yyyy-MM-dd HH:mm:ss"),
      datetimeFormat
    ),
    dateModified: formatDate(
      parseToDate(modifiedDate, "yyyy-MM-dd HH:mm:ss"),
      datetimeFormat
    ),
    author: {
      "@type": "Person",
      name: author?.name || "Tim Dokter SehatQ",
      ...(authorUrl && {
        url: authorUrl,
      }),
    },
    publisher: {
      "@type": "Organization",
      name: "SehatQ",
      logo: {
        "@type": "ImageObject",
        url: "https://www.sehatq.com/public/assets/img/logo.png?v=05202011",
      },
    },
    description: meta,
  };

  return [dataNewsArticle];
}

export function generateArticleRatingMicrodata(
  article: Article,
  rating: ArticleRating
) {
  const dataArticleRating: ArticleRatingMicrodata = {
    "@context": `${SCHEMA_URL_MICRODATA}/`,
    "@type": "Book",
    name: article.headlineBait,
    description: article.meta,
    ...(rating.totalReview > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.average,
            bestRating: 5,
            worstRating: 1,
            ratingCount: rating.totalReview,
          },
        }
      : null),
  };

  return [dataArticleRating];
}
