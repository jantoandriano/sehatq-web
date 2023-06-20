export interface HCPSSpecialityData {
  id: number;
  name: string;
  slug: string;
  imageUrl: string[];
}
export interface HCPSpecialityResponse {
  data: HCPSSpecialityData[];
}

export function modelHCPSpecialityLink(data: HCPSpecialityResponse["data"]) {
  return data.map((data) => ({
    id: data.id,
    name: data.name,
    slug: data.slug,
    imageUrl: data.imageUrl,
  }));
}

export type HCPSpecialityLink = ReturnType<typeof modelHCPSpecialityLink>;
