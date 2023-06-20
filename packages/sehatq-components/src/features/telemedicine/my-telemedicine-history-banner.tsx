import React from "react";
import { ASSETS } from "@sehatq/constants";
import {
  MyTelemedicinesCache,
  useGetMyTelemedicines,
} from "../profile/my-telemedicine-queries";
import {
  MyTelemedicineHistoryBannerDesktop,
  MyTelemedicineHistoryBannerDesktopSkeleton,
} from "./my-telemedicine-history-banner-desktop";
import { MyTelemedicineHistoryBannerMobile } from "./my-telemedicine-history-banner-mobile";

export type MyTelemedicineHistoryBannerProps = {
  isMobile?: boolean;
};

function selectMyTelemedHistory(cache: MyTelemedicinesCache) {
  return cache.data[0];
}

export function MyTelemedicineHistoryBanner(
  props: MyTelemedicineHistoryBannerProps
) {
  const { isMobile } = props;
  const { data, isLoading } = useGetMyTelemedicines(
    {
      page: "1",
      perPage: "1",
      userId: "",
    },
    {
      select: selectMyTelemedHistory,
    }
  );

  if (isLoading) {
    return <MyTelemedicineHistoryBannerSkeleton isMobile={isMobile} />;
  }

  if (!data) {
    return null;
  }

  if (isMobile) {
    return <MyTelemedicineHistoryBannerMobile />;
  }

  const otherProps = {
    consultationId: data.id,
    doctorImageUrl: data.doctorImageSrc || ASSETS.NO_IMAGE,
    doctorName: data.doctorName,
    schedule: data.chatDate,
  };

  return <MyTelemedicineHistoryBannerDesktop {...otherProps} />;
}

export type MyTelemedicineHistoryBannerSkeletonProps = {
  isMobile?: boolean;
};

export function MyTelemedicineHistoryBannerSkeleton(
  props: MyTelemedicineHistoryBannerSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return null;
  }
  return <MyTelemedicineHistoryBannerDesktopSkeleton />;
}
