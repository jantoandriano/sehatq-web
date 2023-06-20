import React, { useState } from "react";
import { useAssets } from "@sehatq/utils";

import {
  ReviewBannerDesktop,
  ReviewBannerDesktopProps,
  ReviewBannerSkeletonDesktop,
} from "./review-banner-desktop";
import {
  ReviewBannerMobile,
  ReviewBannerMobileProps,
  ReviewBannerSkeletonMobile,
} from "./review-banner-mobile";

export type ReviewBannerProps =
  | ({ isMobile: false } & ReviewBannerDesktopProps)
  | ({ isMobile: true } & ReviewBannerMobileProps);

export type ReviewBannerSkeletonProps = { isMobile: boolean };

export function ReviewBanner(props: ReviewBannerProps) {
  const { isMobile, imageUrl } = props;
  const [isBrokenAvatar, setIsBrokenAvatar] = useState(false);
  const ASSETS = useAssets(["NO_IMAGE"]);

  function onAvatarError() {
    setIsBrokenAvatar(true);
  }

  const otherProps = {
    ...props,
    onAvatarError,
    imageUrl: !isBrokenAvatar ? imageUrl : `${ASSETS.NO_IMAGE}`,
  };

  if (isMobile) {
    return <ReviewBannerMobile {...otherProps} />;
  }
  return <ReviewBannerDesktop {...otherProps} />;
}

export function ReviewBannerSkeleton(props: ReviewBannerSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ReviewBannerSkeletonMobile />;
  }
  return <ReviewBannerSkeletonDesktop />;
}
