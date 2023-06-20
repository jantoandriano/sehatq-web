export interface HCFServicesResponse {
  data: {
    id: number;
    slug: string;
    name: string;
    description: string;
    baseUrl: string;
  }[];
}

export function modelHCFServices(data: HCFServicesResponse["data"]) {
  return data.map((data) => ({
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    imageUrl: data.baseUrl,
  }));
}

export type HCFServices = ReturnType<typeof modelHCFServices>[number];
