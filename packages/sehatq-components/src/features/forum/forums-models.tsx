import { ForumResponse, modelForum } from "./forum-models";

export interface FilterOptionsSort {
  id: string;
  name: string;
}

export interface ForumsPagination {
  total: number;
  page: number;
  current: number;
  perPage: number;
  maxPage: number;
  next: string;
  prev?: string;
}

export interface ForumsCategoryData {
  id: number;
  name: string;
  imageUrl: string[];
  slug: string;
}
export interface ForumsFilterResponse {
  categories: ForumsCategoryData[];
}

export interface ForumsMeta {
  pagination: ForumsPagination;
  filter: ForumsFilterResponse;
  sortBy: {
    id: number;
    name: string;
  }[];
}

export interface ForumsData {
  data: ForumResponse["data"] & {
    user: {
      id: number;
      email: string;
      nameInitial?: string;
      gender?: string;
      age?: number;
      genderName: string;
      genderNameBg: string;
    };
    date: string;
  };
}

export interface ForumsResponse {
  meta: ForumsMeta;
  data: ForumsData["data"][];
}

export function modelForums(data: ForumsResponse["data"]) {
  return data.map((dataForum) => modelForum(dataForum));
}

export function modelMetaForums(meta: ForumsResponse["meta"]) {
  return {
    categories: meta.filter.categories,
    pagination: meta.pagination,
    sortBy: meta.sortBy,
  };
}

export type Forums = ReturnType<typeof modelForums>[number];
export type MetaForums = ReturnType<typeof modelMetaForums>;
