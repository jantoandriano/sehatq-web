export const INSIDER_OBJECT_PAGE_TYPES = {
  ARTICLE: "Artikel",
  ARTICLES: "Article Listing",
};

export type InsiderObjectPageTypesKey = keyof typeof INSIDER_OBJECT_PAGE_TYPES;

export type InsiderObjectPageTypes =
  typeof INSIDER_OBJECT_PAGE_TYPES[InsiderObjectPageTypesKey];
