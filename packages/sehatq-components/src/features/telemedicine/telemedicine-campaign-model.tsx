export interface TelemedicineCampaignResponse {
  data: {
    id: number;
    placement: string;
    title: string;
    subTitle: string;
    description: string | null;
    banner: string;
    bannerMobile: string;
    icon: string;
    startOn: string;
    endOn: string;
    slug: string;
  };
}

export function modelTelemedicineCampaign(
  campaign: TelemedicineCampaignResponse["data"]
) {
  return campaign;
}
