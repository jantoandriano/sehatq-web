import { formatDate, parseToDate, toSlug } from "@sehatq/utils";

export interface ArticleTag {
  id: number;
  name: string;
  slug: string;
}

export interface TokoTag {
  id: number;
  name: string;
  slug: string;
}

export interface ArticleImages {
  url: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArticleAuthor {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  biograph: string;
}

export interface ArticleReviewer {
  id: number;
  name: string;
  slug: string;
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ArticleDetail {
  id: number;
  title: string;
  shareUrl: string;
  reviewedBy?: ArticleReviewer;
  author?: ArticleAuthor;
  category: ArticleCategory;
  date: string;
  updatedDate: string;
  keyword: string;
  images: ArticleImages[];
  headlineBait: string;
  reference: string;
  content: string;
  summary: string;
  meta: string;
  bookmarked: number;
  tags: ArticleTag[];
  tokotags: TokoTag[];
  sponsored: 0 | 1;
  sponsorUrl: string | null;
  sponsorImageUrl: string | null;
}

export interface ArticleResponse {
  data: ArticleDetail;
}

export function modelArticle(data: ArticleResponse["data"]) {
  return {
    id: data.id,
    title: data.title,
    shareUrl: data.shareUrl,
    reference: data.reference,
    content: data.content,
    tags:
      data.tags.map((tag: ArticleTag) => ({
        ...tag,
        slug: tag.slug ?? toSlug(tag.name),
      })) ?? [],
    date: formatDate(
      parseToDate(data.date, "yyyy-MM-dd HH:mm:ss"),
      "d MMM yyyy"
    ),
    updatedDate: formatDate(
      parseToDate(data.updatedDate, "yyyy-MM-dd HH:mm:ss"),
      "d MMM yyyy"
    ),
    reviewedBy: data.reviewedBy,
    author: data.author,
    meta: data.meta,
    headlineBait: data.headlineBait,
    keyword: data.keyword,
    category: data.category,
    image: data.images[0],
    summary: data.summary,
    publishDate: data.date,
    modifiedDate: data.updatedDate,
    hasSponsored: Boolean(data.sponsored),
    sponsorUrl: data.sponsorUrl,
    sponsorImageUrl: data.sponsorImageUrl,
  };
}

export type Article = ReturnType<typeof modelArticle>;
