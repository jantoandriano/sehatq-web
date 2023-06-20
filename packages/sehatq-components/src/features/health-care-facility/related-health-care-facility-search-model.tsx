import { ASSETS } from "@sehatq/constants";

export interface HCPSpecialitiesResponse {
  data: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string[];
  }[];
}

export function modelHCPSpecialities(data: HCPSpecialitiesResponse["data"]) {
  return data.map((speciality) => ({
    ...speciality,
    imageUrl:
      speciality.imageUrl && speciality.imageUrl.length > 0
        ? speciality.imageUrl[1] ?? speciality.imageUrl[0]
        : ASSETS.NO_IMAGE,
  }));
}
export type HCPSpecialities = ReturnType<typeof modelHCPSpecialities>;

export interface HCFHCPScheduleDaysResponse {
  data: {
    day: string;
  }[];
}

export function modelHCFHCPScheduleDays(
  data: HCFHCPScheduleDaysResponse["data"]
) {
  return data;
}
export type HCFHCPScheduleDays = ReturnType<typeof modelHCFHCPScheduleDays>;

export interface HCFServicePackResponse {
  data: {
    id: number;
    name: string;
    price: number;
    isFree: number;
  }[];
}

export function modelHCFServicePack(data: HCFServicePackResponse["data"]) {
  return data;
}
export type HCFServicePack = ReturnType<typeof modelHCFServicePack>;
