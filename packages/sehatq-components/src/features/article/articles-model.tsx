import { formatDate, parseToDate } from "@sehatq/utils";
import {
  ArticleAuthor,
  ArticleCategory,
  ArticleReviewer,
} from "./article-model";

export interface ArticlesFeatured {
  category: ArticleCategory;
  path: string;
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt?: string;
  meta?: string;
  date: string;
  author: ArticleAuthor;
  reviewer: ArticleReviewer;
}

export interface ArticlesPagination {
  total: number;
  page: number;
  current: number;
  perPage: number;
  maxPage: number;
  next: string;
  prev?: string;
}

export interface ArticlesCategoryData {
  id: number;
  name: string;
  slug: string;
  imageUrl: string[];
}
export interface ArticleFilterResponse {
  categories: ArticlesCategoryData[];
}
export interface ArticlesMeta {
  featured: ArticlesFeatured[];
  h1: string;
  pagination: ArticlesPagination;
  filter: ArticleFilterResponse;
}

export interface ArticlesData {
  category: ArticleCategory;
  path: string;
  id: number;
  slug: string;
  title: string;
  headlineBait: string;
  imageUrl: string;
  imageAlt: string;
  meta: string;
  date: string;
  author?: ArticleAuthor;
  reviewer?: ArticleReviewer;
  rating?: {
    average: number;
    totalReview: number;
  };
}

export interface ArticlesResponse {
  meta: ArticlesMeta;
  data: ArticlesData[];
}

export interface PopularArticlesMetaFilter {
  viewedDate: "1-week-ago" | "2-week-ago" | "1-month-ago" | "2-month-ago";
}
export interface PopularArticlesMeta {
  filter: PopularArticlesMetaFilter;
}
export interface PopularArticlesData {
  id: number;
  slug: string;
  title: string;
  category: ArticleCategory;
}
export interface PopularArticlesResponse {
  meta: PopularArticlesMeta;
  data: PopularArticlesData[];
}

export function modelArticles(data: ArticlesResponse["data"]) {
  return data.map((dataArticle) => ({
    id: dataArticle.id,
    title: dataArticle.title,
    author: {
      name: dataArticle.author?.name ?? "",
      slug: dataArticle.author?.slug ?? "",
    },
    slug: dataArticle.slug,
    category: {
      name: dataArticle.category?.name ?? "",
      slug: dataArticle.category?.slug ?? "",
    },
    imageUrl:
      dataArticle.imageUrl ||
      "https://www.sehatq.com/public/assets/img/no-image.jpg",
    imageAlt: dataArticle.imageAlt,
    date: formatDate(
      parseToDate(dataArticle.date, "yyyy-MM-dd HH:mm:ss"),
      "d MMM yyyy"
    ),
    meta: dataArticle.meta,
    ...(dataArticle.rating && {
      rating: { ...dataArticle.rating },
    }),
  }));
}

export function modelMetaArticles(meta: ArticlesResponse["meta"]) {
  let featured;
  if (meta.featured.length > 0) {
    featured = {
      id: meta.featured[0].id ?? 0,
      slug: meta.featured[0].slug ?? "",
      category: {
        slug: meta.featured[0].category.slug ?? "",
        name: meta.featured[0].category.name ?? "",
      },
      title: meta.featured[0].title ?? "",
      imageUrl: meta.featured[0].imageUrl ?? "",
      imageAlt: meta.featured[0].imageAlt ?? "",
      author: {
        slug: meta.featured[0].author?.slug ?? "",
        name: meta.featured[0].author?.name ?? "",
      },
      date: meta.featured[0].date
        ? formatDate(
            parseToDate(meta.featured[0].date, "yyyy-MM-dd HH:mm:ss"),
            "d MMM yyyy"
          )
        : "",
    };
  }
  return {
    featured,
    filter: meta.filter,
    pagination: meta.pagination,
  };
}

export function modelPopularArticles(data: PopularArticlesResponse["data"]) {
  return data.map((item) => ({
    id: item.id,
    title: item.title || "",
    slug: item.slug || "",
    category: {
      id: item.category?.id || 0,
      name: item.category?.name || "",
      slug: item.category?.slug || "",
    },
  }));
}

export function modelPopularArticlesMeta(
  meta: PopularArticlesResponse["meta"]
) {
  const viewedDate = meta.filter?.viewedDate || [];
  return {
    filter: {
      viewedDate,
    },
  };
}

export type PopularArticles = ReturnType<typeof modelPopularArticles>[number];
export type MetaPopularArticles = ReturnType<typeof modelPopularArticlesMeta>;
export type Articles = ReturnType<typeof modelArticles>[number];
export type MetaArticles = ReturnType<typeof modelMetaArticles>;
