import React from "react";
import {
  useGetProfile,
  ProfileCache,
  useGetTelemedLandingCampaign,
  TelemedLandingCampaignCache,
} from "@sehatq/components";
import { TelemedicineCampaignListPageDesktop } from "./telemedicine-campaign-list-page-desktop";
import { TelemedicineCampaignListPageMobile } from "./telemedicine-campaign-list-page-mobile";

export type TelemedicineCampaignListProps = {
  isMobile: boolean;
};

function selectHasDataCampaign(cache: TelemedLandingCampaignCache) {
  return Boolean(cache.data);
}

function selectUserId(cache: ProfileCache) {
  return cache.id;
}

export function TelemedicineCampaignListPage(
  props: TelemedicineCampaignListProps
) {
  const { isMobile } = props;
  const { data: userId } = useGetProfile({ select: selectUserId });
  const isLogin = Boolean(userId);

  // Check is data available
  const { data: campaign1 } = useGetTelemedLandingCampaign(
    { placementCode: "landing-1" },
    { select: selectHasDataCampaign }
  );
  const { data: campaign2 } = useGetTelemedLandingCampaign(
    { placementCode: "landing-2" },
    { select: selectHasDataCampaign }
  );

  const otherProps = {
    isLogin,
    hasCampaign1: Boolean(campaign1),
    hasCampaign2: Boolean(campaign2),
  };

  if (isMobile) {
    return <TelemedicineCampaignListPageMobile {...otherProps} />;
  }
  return <TelemedicineCampaignListPageDesktop {...otherProps} />;
}
