import { DISEASE_CATEGORIES } from "@sehatq/constants";

export interface DiseaseCategoriesResponse {
  data: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string[];
  }[];
}

export function modelDiseaseCategories(
  slug: string
): DiseaseCategoriesResponse["data"] {
  if (slug) {
    return DISEASE_CATEGORIES.filter((item) => item.slug === slug);
  }
  return DISEASE_CATEGORIES;
}
