import React from "react";
import {
  TelemedicineLandingCampaignDesktop,
  TelemedicineLandingCampaignDesktopSkeleton,
} from "./telemedicine-landing-campaign-desktop";
import {
  TelemedicineLandingCampaignMobile,
  TelemedicineLandingCampaignMobileSkeleton,
} from "./telemedicine-landing-campaign-mobile";
import {
  TelemedLandingCampaignCache,
  useGetTelemedLandingCampaign,
} from "./telemedicine-landing-campaign-queries";

export type TelemedicineLandingCampaignProps = {
  isMobile: boolean;
  landingCampaignType: "landing-1" | "landing-2";
};

function selectCampaign(cache: TelemedLandingCampaignCache) {
  return cache.data;
}

export function TelemedicineLandingCampaign(
  props: TelemedicineLandingCampaignProps
) {
  const { isMobile } = props;
  const { data: campaign, isLoading } = useGetTelemedLandingCampaign(
    { placementCode: props.landingCampaignType },
    { select: selectCampaign }
  );

  const otherProps = {
    title: campaign?.title ?? "",
    subTitle: campaign?.subTitle ?? "",
    slug: campaign?.slug ?? "",
    banner: isMobile ? campaign?.bannerMobile ?? "" : campaign?.banner ?? "",
    hcps: campaign?.hcps ?? undefined,
    isLoading,
  };

  if (isLoading) {
    return <TelemedicineLandingCampaignSkeleton isMobile={isMobile} />;
  }

  if (!campaign) {
    return null;
  }

  if (isMobile) {
    return <TelemedicineLandingCampaignMobile {...otherProps} />;
  }

  return <TelemedicineLandingCampaignDesktop {...otherProps} />;
}

export type TelemedicineLandingCampaignSkeletonProps = {
  isMobile: boolean;
};

export function TelemedicineLandingCampaignSkeleton(
  props: TelemedicineLandingCampaignSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <TelemedicineLandingCampaignMobileSkeleton />;
  }

  return <TelemedicineLandingCampaignDesktopSkeleton />;
}
