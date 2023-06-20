export interface HCPHCFSData {
  id: number;
  name: string;
  slug: string;
  district: string;
  city: string;
  latitude: number;
  longitude: number;
  distance: number;
  imageUrl: string;
  imageAlt: string;
  phone: string;
  bookingOnline: number;
  scheduleDays: string[];
  price: number;
  partner: number;
  procedures: {
    id: number;
    slug: string;
    name: string;
  }[];
}
export interface HCPDetailData {
  id: number;
  name: string;
  gender: string;
  profile: string;
  keyword: string;
  meta: string;
  speciality: {
    id: number;
    name: string;
    slug: string;
  };
  imageUrl: string;
  image: {
    url: string;
    alt: string;
    caption: string;
  };
  shareUrl: string;
  hcf: HCPHCFSData[];
}

export interface HCPDetailResponse {
  data: HCPDetailData;
}

export function modelHCPDetail(data: HCPDetailResponse["data"]) {
  return {
    id: data.id,
    name: data.name,
    gender: data.gender,
    profile: data.profile,
    keyword: data.keyword,
    meta: data.meta,
    specialityName: data.speciality?.name,
    imageUrl: data.image?.url || data.imageUrl,
    imageAlt: data.image.alt,
    hcpHcfSchedules: data.hcf,
    specialitySlug: data.speciality?.slug,
    shareUrl: data.shareUrl,
  };
}

export type HCPDetail = ReturnType<typeof modelHCPDetail>;
