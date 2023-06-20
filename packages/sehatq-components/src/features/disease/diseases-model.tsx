export interface DiseaseReviewedBy {
  id: number;
  slug: string;
  name: string;
}

export interface DiseasesFeatured {
  path: string;
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  reviewedBy: DiseaseReviewedBy;
}

export interface DiseasesPagination {
  total: number;
  page: number;
  current: number;
  perPage: number;
  maxPage: number;
  next: string;
  prev?: string;
}

export interface DiseaseCategoriesData {
  id: number;
  name: string;
  slug: string;
  imageUrl: string[];
}
export interface DiseaseFilterResponse {
  categories: DiseaseCategoriesData[];
}
export interface DiseasesMeta {
  featured: DiseasesFeatured[];
  pagination: DiseasesPagination;
  filter: DiseaseFilterResponse;
  h1: string;
}

export interface DiseasesData {
  path: string;
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
}

export interface DiseasesResponse {
  meta: DiseasesMeta;
  data: DiseasesData[];
}

export interface DiseasesSEOResponse {
  data: {
    id: number;
    slug: string;
    name: string;
    metaTitle: string;
    metaDescription: string;
    keyword: string;
    heading: string;
    metaContent: string;
  };
}

export interface DiseaseDetailSEOResponse {
  data: {
    id: number;
    domain: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    contentTitle: string;
    contentDescription: string;
  };
}

export function modelDiseases(data: DiseasesResponse["data"]) {
  return data.map((dataDisease) => ({
    id: dataDisease.id,
    title: dataDisease.title,
    slug: dataDisease.slug,
    imageUrl: dataDisease.imageUrl,
    imageAlt: dataDisease.imageAlt,
  }));
}

export function modelMetaDiseases(meta: DiseasesResponse["meta"]) {
  return {
    filter: meta.filter,
    featured: {
      id: meta.featured[0].id ?? 0,
      slug: meta.featured[0].slug ?? "",
      title: meta.featured[0].title ?? "",
      imageUrl:
        meta.featured[0].imageUrl ||
        "https://www.sehatq.com/public/assets/img/no-image.jpg",
      imageAlt: meta.featured[0].imageAlt ?? "",
    },
    pagination: meta.pagination,
  };
}

export function modelDiseasesSEO({ data }: DiseasesSEOResponse) {
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    keyword: data.keyword,
    heading: data.heading,
    metaContent: data.metaContent,
  };
}

export function modelDiseaseDetailSEO(data: DiseaseDetailSEOResponse["data"]) {
  return {
    slug: data?.slug ?? "",
    metaTitle: data?.metaTitle ?? "",
    metaDescription: data?.metaDescription ?? "",
    keywords: data?.keywords ?? "",
    contentTitle: data?.contentTitle ?? "",
    contentDescription: data?.contentDescription ?? "",
  };
}

export type Diseases = ReturnType<typeof modelDiseases>[number];
export type MetaDiseases = ReturnType<typeof modelMetaDiseases>;
