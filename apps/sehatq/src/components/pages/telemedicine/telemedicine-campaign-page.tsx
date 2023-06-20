import {
  TelemedicineCampaignCache,
  useGetMyLocation,
  useGetTelemedCampaign,
} from "@sehatq/components";
import { useRouter } from "next/router";
import React from "react";
import { TelemedicineCampaignPageDesktop } from "./telemedicine-campaign-page-desktop";
import { TelemedicineCampaignPageMobile } from "./telemedicine-campaign-page-mobile";

export type TelemedicineCampaignPageProps = {
  isMobile: boolean;
};

function selectCampaign(cache: TelemedicineCampaignCache) {
  return cache.data.title;
}

export function TelemedicineCampaignPage(props: TelemedicineCampaignPageProps) {
  const { isMobile } = props;
  const router = useRouter();
  const {
    slug = "",
    page,
    perPage,
    sort,
    lat,
    long,
    q,
    specialitySlug,
    city,
    doctorExperience,
    gender,
    price,
  } = router.query;

  const { data: location } = useGetMyLocation();

  const { data: campaignTitle } = useGetTelemedCampaign(
    { campaignSlug: slug as string },
    { select: selectCampaign }
  );

  const otherProps = {
    page: (page as string) ?? "1",
    perPage: (perPage as string) ?? "12",
    sortBy: sort as string,
    userLat: (lat as string) ?? location?.lat,
    userLong: (long as string) ?? location?.long,
    query: q as string,
    campaignSlug: slug as string,
    city: city as string,
    doctorExperience: doctorExperience as string,
    gender: gender as string,
    price: price as string,
    specialitySlug: (specialitySlug as string) ?? "",
    campaignName: campaignTitle ?? "",
  };

  if (isMobile) return <TelemedicineCampaignPageMobile {...otherProps} />;

  return <TelemedicineCampaignPageDesktop {...otherProps} />;
}
