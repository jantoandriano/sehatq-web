import { formatDate, parseToDate } from "@sehatq/utils";

export interface RelatedArticleAuthor {
  id: number;
  name: string;
  slug: string;
}

export interface RelatedArticleReviewer {
  id: number;
  name: string;
  slug: string;
}

export interface RelatedArticleCategory {
  id: number;
  name: string;
  slug: string;
}

export interface RelatedArticleData {
  id: number;
  slug: string;
  title: string;
  category?: RelatedArticleCategory;
  meta?: string;
  date?: string;
  imageUrl?: string;
  imageAlt?: string;
  author?: RelatedArticleAuthor;
  reviewer?: RelatedArticleReviewer;
}

export interface RelatedArticlesResponse {
  data: RelatedArticleData[];
}

export function modelRelatedArticles(data: RelatedArticlesResponse["data"]) {
  return data.map((dataRelatedArticle) => ({
    id: dataRelatedArticle.id,
    slug: dataRelatedArticle.slug,
    title: dataRelatedArticle.title,
    category: dataRelatedArticle.category
      ? {
          name: dataRelatedArticle.category.name,
          slug: dataRelatedArticle.category.slug,
        }
      : undefined,
    imageUrl: dataRelatedArticle.imageUrl,
    imageAlt: dataRelatedArticle.imageAlt,
    author: dataRelatedArticle.author
      ? {
          name: dataRelatedArticle.author.name,
          slug: dataRelatedArticle.author.slug,
        }
      : undefined,
    date: dataRelatedArticle.date
      ? formatDate(
          parseToDate(dataRelatedArticle.date, "yyyy-MM-dd HH:mm:ss"),
          "d MMM yyyy"
        )
      : undefined,
    meta: dataRelatedArticle.meta,
  }));
}

export type RelatedArticles = ReturnType<typeof modelRelatedArticles>[number];
