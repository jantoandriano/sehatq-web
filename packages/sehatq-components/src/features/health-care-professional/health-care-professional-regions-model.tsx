export interface HCPRegionResponse {
  data: {
    district: {
      code: string;
      name: string;
      slug: string;
    };
    city: {
      code: string;
      name: string;
      slug: string;
    };
    province: {
      code: string;
      name: string;
      slug: string;
    };
  }[];
}

export function modelHCPRegion(data: HCPRegionResponse["data"]) {
  return data.map((region) => ({
    district: region.district,
    city: region.city,
  }));
}

export type HCPRegion = ReturnType<typeof modelHCPRegion>[number];
