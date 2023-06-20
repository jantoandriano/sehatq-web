import React from "react";
import {
  MyBookedTelemedicineBannerDesktop,
  MyBookedTelemedicineBannerDesktopSkeleton,
} from "./my-booked-telemedicine-banner-desktop";
import {
  MyBookedTelemedicineBannerMobile,
  MyBookedTelemedicineBannerMobileSkeleton,
} from "./my-booked-telemedicine-banner-mobile";
import {
  MyBookedTelemedicinesCache,
  useGetMyBookedTelemedicines,
} from "./my-booked-telemedicine-queries";

export type MyBookedTelemedicineBannerProps = {
  isMobile: boolean;
};

function selectMyBookedTelemed(cache: MyBookedTelemedicinesCache) {
  return cache.data;
}

export function MyBookedTelemedicineBanner(
  props: MyBookedTelemedicineBannerProps
) {
  const { isMobile } = props;
  const { data: bookedConsultations, isLoading } = useGetMyBookedTelemedicines(
    {
      page: "1",
      perPage: "3",
      userId: "",
    },
    {
      select: selectMyBookedTelemed,
    }
  );

  if (isLoading) {
    return <MyBookedTelemedicineBannerSkeleton isMobile={isMobile} />;
  }

  if (!bookedConsultations?.length) {
    return null;
  }

  const otherProps = {
    bookedConsultations: bookedConsultations.slice(0, 3), // limit to 3
  };

  if (isMobile) {
    return <MyBookedTelemedicineBannerMobile {...otherProps} />;
  }

  return <MyBookedTelemedicineBannerDesktop {...otherProps} />;
}

export type MyBookedTelemedicineBannerSkeletonProps = {
  isMobile: boolean;
};

export function MyBookedTelemedicineBannerSkeleton(
  props: MyBookedTelemedicineBannerSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <MyBookedTelemedicineBannerMobileSkeleton />;
  }

  return <MyBookedTelemedicineBannerDesktopSkeleton />;
}
