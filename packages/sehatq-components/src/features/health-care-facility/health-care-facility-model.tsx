import { ASSETS } from "@sehatq/constants";

export interface HCFData {
  bookingOnline: number;
  bpjs: number;
  city: string;
  class: string;
  distance: number | null;
  district: string;
  emergency: number;
  generalFacility: number[];
  hcfTypeId: number;
  id: number;
  imageAlt: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  medicalFacility: number[];
  name: string;
  nameOnly: string;
  openTime: string;
  partner: number;
  rating: number;
  slug: string;
  type: string;
}

export interface HCFMeta {
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
    partnershipTypes: {
      key: string;
      value: string;
    }[];
    medicalFacilities: {
      id: number;
      slug: string;
      name: string;
    }[];
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
  };
}

export interface HCFListResponse {
  meta: HCFMeta;
  data: HCFData[];
}

export function modelHCFList(data: HCFListResponse["data"]) {
  return data.map((data) => ({
    id: data.id,
    name: data.name,
    type: data.type,
    class: data.class,
    imageUrl: data.imageUrl,
    city: data.city,
    district: data.district,
    partner: data.partner,
    slug: data.slug,
    emergency: data.emergency,
    distance: data.distance,
    openTime: data.openTime,
    rating: data.rating,
  }));
}

export function modelMetaHCFList(meta: HCFListResponse["meta"]) {
  return {
    total: meta.pagination.total,
    page: meta.pagination.page,
    perPage: meta.pagination.perPage,
    maxPage: meta.pagination.maxPage,
    cities: meta.filter?.cities,
    procedures: meta.filter?.procedures,
    partnershipTypes: meta.filter?.partnershipTypes,
    medicalFacilities: meta.filter?.medicalFacilities,
  };
}

export type HCFList = ReturnType<typeof modelHCFList>[number];
export type MetaHCFList = ReturnType<typeof modelMetaHCFList>;

export interface HCFDetailResponse {
  data: {
    id: number;
    name: string;
    type: string;
    smartClinic: number;
    class: string;
    partner: number;
    imageUrl: string[];
    images: {
      url: string;
      caption: string;
      alt: string;
    }[];
    shareUrl: string;
    address: string;
    mapsUrl: string;
    operationalHours: string;
    openTime: string;
    description: string;
    generalFacility: {
      id: number;
      name: string;
      imageUrl: string;
    }[];
    medicalFacility: {
      id: number;
      name: string;
      imageUrl: string;
    }[];
    medicalAction: string;
    bpjs: number;
    room: string;
    mcu: string;
    emergency: number;
    city: string;
    district: string;
    latitude: number;
    longitude: number;
    distance?: number | null;
    rating: number;
    keyword: string;
    insurance: {
      id: number;
      name: string;
    }[];
    contactUs: string;
    bookRapidTest: number;
    phone: string;
    bookingOnline: 0 | 1;
    metadesc: string;
    hcp: {
      specialityId: number;
      specialityName: string;
      imageUrl: string[];
      hcpList: {
        id: number;
        slug: string;
        name: string;
        gender: string;
        imageUrl: string;
      }[];
    }[];
  };
}

export function modelHCFDetail(data: HCFDetailResponse["data"]) {
  return {
    id: data.id,
    name: data.name,
    type: data.type,
    class: data.class,
    imageUrl: data.imageUrl[0] ?? ASSETS.NO_IMAGE,
    city: data.city,
    district: data.district,
    partner: data.partner,
    emergency: data.emergency,
    distance: data.distance,
    openTime: data.openTime,
    rating: data.rating,
    shareUrl: data.shareUrl,
    mapsUrl: data.mapsUrl,
    bpjs: data.bpjs,
    address: data.address,
    description: data.description,
    generalFacility: data.generalFacility,
    medicalFacility: data.medicalFacility,
    insurance: data.insurance,
    metadesc: data.metadesc,
    keyword: data.keyword,
    operationalHours: data.operationalHours,
    latitude: data.latitude,
    longitude: data.longitude,
    phone: data.phone,
    bookingOnline: !!data.bookingOnline,
  };
}

export type HCFDetail = ReturnType<typeof modelHCFDetail>;

export interface HCFSEOResponse {
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

export function modelHCFSEO(data: HCFSEOResponse["data"]) {
  return {
    contentTitle: data.contentTitle ?? "",
    contentDescription: data.contentDescription ?? "",
  };
}

export type HCFSEO = ReturnType<typeof modelHCFSEO>;
