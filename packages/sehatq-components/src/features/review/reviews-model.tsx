import { formatDate } from "@sehatq/utils";

export interface ReviewAuthor {
  id: number;
  name: string;
  slug: string;
}

export interface ReviewCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ReviewsPagination {
  total: number;
  current: number;
  perPage: number;
}

export interface ReviewsMetaData {
  id: string;
  name: string;
}
export interface ReviewsMeta {
  pagination: ReviewsPagination;
  sort: ReviewsMetaData[];
}

export interface ReviewsData {
  id: number;
  slug: string;
  thumbUrl?: string;
  imageUrl: string;
  imageAlt: string;
  metadesc?: string;
  category: ReviewCategory;
  title: string;
  publishedDate: string;
  author: ReviewAuthor;
}

export interface ReviewsResponse {
  meta: ReviewsMeta;
  data: ReviewsData[];
}

export function modelReviews(data: ReviewsResponse["data"]) {
  return data.map((dataReview) => ({
    id: dataReview.id,
    title: dataReview.title,
    author: {
      name: dataReview.author?.name ?? "",
      slug: dataReview.author?.slug ?? "",
    },
    slug: dataReview.slug,
    category: {
      name: dataReview.category?.name ?? "",
      slug: dataReview.category?.slug ?? "",
    },
    imageUrl:
      dataReview.imageUrl ||
      "https://www.sehatq.com/public/assets/img/no-image.jpg",
    imageAlt: dataReview.imageAlt,
    publishedDate: formatDate(new Date(dataReview.publishedDate), "d MMM yyyy"),
    meta: dataReview.metadesc,
  }));
}

export function modelMetaReviews(meta: ReviewsResponse["meta"]) {
  return {
    pagination: meta.pagination,
  };
}

export type Reviews = ReturnType<typeof modelReviews>[number];

export type MetaReviews = ReturnType<typeof modelMetaReviews>;
