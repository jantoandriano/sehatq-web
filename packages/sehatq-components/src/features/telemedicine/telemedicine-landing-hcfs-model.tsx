import { ASSETS } from "@sehatq/constants";

export interface TelemedLandingHCFSResponse {
  data: {
    id: number;
    name: string;
    logoUrl: string;
    slug: string;
  }[];
}

export function modelTelemedLandingHCFS(
  data: TelemedLandingHCFSResponse["data"]
) {
  return data.map((hcf) => ({
    id: hcf.id,
    name: hcf.name,
    logoUrl: hcf.logoUrl || ASSETS.NO_IMAGE,
    slug: hcf.slug,
  }));
}
