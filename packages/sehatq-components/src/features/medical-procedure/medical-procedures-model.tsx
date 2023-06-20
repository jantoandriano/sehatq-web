import { formatDate, parseToDate } from "@sehatq/utils";

export interface MedicalProcedureAuthor {
  id: number;
  name: string;
  slug: string;
}

export interface MedicalProcedureCategory {
  id: number;
  name: string;
  slug: string;
}

export interface MedicalProceduresPagination {
  total: number;
  page: number;
  current: number;
  perPage: number;
  maxPage: number;
  next: string;
  prev?: string;
}

export interface MedicalProceduresMeta {
  h1: string;
  pagination: MedicalProceduresPagination;
}

export interface MedicalProceduresData {
  category: MedicalProcedureCategory;
  path: string;
  id: number;
  slug: string;
  title: string;
  headlineBait: string;
  imageUrl: string;
  imageAlt: string;
  meta: string;
  date: string;
  author?: MedicalProcedureAuthor;
  rating?: {
    average: number;
    totalReview: number;
  };
}

export interface MedicalProceduresResponse {
  meta: MedicalProceduresMeta;
  data: MedicalProceduresData[];
}

export function modelMedicalProcedures(
  data: MedicalProceduresResponse["data"]
) {
  return data.map((dataMedicalProcedure) => ({
    id: dataMedicalProcedure.id,
    title: dataMedicalProcedure.title,
    author: {
      name: dataMedicalProcedure.author?.name ?? "",
      slug: dataMedicalProcedure.author?.slug ?? "",
    },
    slug: dataMedicalProcedure.slug,
    category: {
      name: dataMedicalProcedure.category?.name ?? "",
      slug: dataMedicalProcedure.category?.slug ?? "",
    },
    imageUrl:
      dataMedicalProcedure.imageUrl ||
      "https://www.sehatq.com/public/assets/img/no-image.jpg",
    imageAlt: dataMedicalProcedure.imageAlt,
    date: formatDate(
      parseToDate(dataMedicalProcedure.date, "yyyy-MM-dd HH:mm:ss"),
      "d MMM yyyy"
    ),
    meta: dataMedicalProcedure.meta,
    ...(dataMedicalProcedure.rating && {
      rating: { ...dataMedicalProcedure.rating },
    }),
  }));
}

export function modelMetaMedicalProcedures(
  meta: MedicalProceduresResponse["meta"]
) {
  return {
    pagination: meta.pagination,
  };
}

export type MedicalProcedures = ReturnType<
  typeof modelMedicalProcedures
>[number];
export type MetaMedicalProcedures = ReturnType<
  typeof modelMetaMedicalProcedures
>;
