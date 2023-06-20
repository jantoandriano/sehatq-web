import React from "react";
import {
  ArticleBannerDesktop,
  ArticleBannerDesktopProps,
  ArticleBannerSkeletonDesktop,
} from "./article-banner-desktop";
import {
  ArticleBannerMobile,
  ArticleBannerMobileProps,
  ArticleBannerSkeletonMobile,
} from "./article-banner-mobile";

export type ArticleBannerProps =
  | ({ isMobile: false } & ArticleBannerDesktopProps)
  | ({ isMobile: true } & ArticleBannerMobileProps);

export type ArticleBannerSkeletonProps = { isMobile: boolean };

export function ArticleBanner(props: ArticleBannerProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ArticleBannerMobile {...props} />;
  }
  return <ArticleBannerDesktop {...props} />;
}

export function ArticleBannerSkeleton(props: ArticleBannerSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ArticleBannerSkeletonMobile />;
  }
  return <ArticleBannerSkeletonDesktop />;
}
