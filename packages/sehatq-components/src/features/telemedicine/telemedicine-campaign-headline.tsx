import React from "react";
import {
  TelemedicineCampaignHeadlineDesktop,
  TelemedicineCampaignHeadlineDesktopSkeleton,
} from "./telemedicine-campaign-headline-desktop";
import {
  TelemedicineCampaignHeadlineMobile,
  TelemedicineCampaignHeadlineMobileSkeleton,
} from "./telemedicine-campaign-headline-mobile";
import {
  TelemedicineCampaignCache,
  useGetTelemedCampaign,
} from "./telemedicine-campaign-queries";

export type TelemedicineCampaignHeadlineProps = {
  isMobile?: boolean;
  campaignSlug: string;
};

function selectCampaign(cache: TelemedicineCampaignCache) {
  return cache.data;
}

export function TelemedicineCampaignHeadline(
  props: TelemedicineCampaignHeadlineProps
) {
  const { data, isLoading } = useGetTelemedCampaign(
    { campaignSlug: props.campaignSlug },
    { select: selectCampaign }
  );

  if (isLoading) {
    if (props.isMobile) return <TelemedicineCampaignHeadlineMobileSkeleton />;
    return <TelemedicineCampaignHeadlineDesktopSkeleton />;
  }

  if (!data?.banner) {
    return null;
  }

  const otherProps = {
    imageUrl: props.isMobile ? data?.bannerMobile ?? "" : data?.banner ?? "",
    slug: data?.slug,
  };

  if (props.isMobile)
    return <TelemedicineCampaignHeadlineMobile {...otherProps} />;

  return <TelemedicineCampaignHeadlineDesktop {...otherProps} />;
}
