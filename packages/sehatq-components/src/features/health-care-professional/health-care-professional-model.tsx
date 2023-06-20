import { ASSETS } from "@sehatq/constants";

export interface HCPData {
  id: number;
  slug: string;
  name: string;
  nameOnly: string;
  gender: string;
  speciality: number;
  specialityHcp: {
    id: number;
    name: string;
  };
  imageUrl: string;
  imageAlt: string;
  hcfName: string;
  hcfCount: number;
  hcfIds: number[];
  schedules: string;
  district: string;
  city: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export interface HCPMeta {
  pagination: {
    total: number;
    page: number;
    current: number;
    perPage: number;
    maxPage: number;
    next: string;
    prev: string;
  };
  filter: {
    cities: {
      code: string;
      slug: string;
      name: string;
      district: {
        code: string;
        slug: string;
        name: string;
      }[];
    }[];
    procedures: {
      id: number;
      slug: string;
      name: string;
    }[];
    gender: {
      code: string;
      name: string;
    }[];
    practiceDays: string[];
    specialities: {
      id: number;
      name: string;
      slug: string;
      imageUrl: string[];
    }[];
  };
  seoDescription: string;
}

export interface HCPListResponse {
  meta: HCPMeta;
  data: HCPData[];
}

export function modelHCPList(data: HCPListResponse["data"]) {
  return data.map((data) => ({
    id: data.id,
    name: data.name,
    slug: data.slug,
    specialityHcp: data.specialityHcp,
    imageUrl: data.imageUrl || ASSETS.NO_IMAGE,
    imageAlt: data.imageAlt,
    hcfName: data.hcfName,
    district: data.district,
    city: data.city,
    latitude: data.latitude,
    longitude: data.longitude,
    distance: data.distance,
    location: `${data.district}, ${data.city}`,
  }));
}

export function modelMetaHCPList(meta: HCPListResponse["meta"]) {
  return {
    total: meta.pagination.total,
    page: meta.pagination.page,
    perPage: meta.pagination.perPage,
    maxPage: meta.pagination.maxPage,
    cities: meta.filter?.cities ?? [],
    procedures: meta.filter?.procedures ?? [],
    genders: meta.filter?.gender ?? [],
    schedules: meta.filter?.practiceDays ?? [],
    specialities: meta.filter?.specialities ?? [],
  };
}

export type HCPList = ReturnType<typeof modelHCPList>[number];
export type MetaHCPList = ReturnType<typeof modelMetaHCPList>;

export interface HCPSEOResponse {
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

export function modelHCPSEO(data: HCPSEOResponse["data"]) {
  const {
    slug,
    metaTitle,
    metaDescription,
    keywords,
    contentTitle,
    contentDescription,
  } = data;
  return {
    slug,
    metaTitle: metaTitle ?? "",
    metaDescription: metaDescription ?? "",
    keywords: keywords ?? "",
    contentTitle: contentTitle ?? "",
    contentDescription: contentDescription ?? "",
  };
}

export type HCPSEO = ReturnType<typeof modelHCPSEO>;
