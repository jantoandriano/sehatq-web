import React from "react";
import {
  MerchantProductCardDesktop,
  MerchantProductCardDesktopProps,
  MerchantProductSkeletonDesktop,
  MerchantProductSkeletonDesktopProps,
} from "./merchant-product-card-desktop";
import {
  MerchantProductCardMobile,
  MerchantProductCardMobileProps,
  MerchantProductSkeletonMobile,
  MerchantProductSkeletonMobileProps,
} from "./merchant-product-card-mobile";

export type MerchantProductCardProps =
  | ({ isMobile: false } & MerchantProductCardDesktopProps)
  | ({ isMobile: true } & MerchantProductCardMobileProps);

export function MerchantProductCard(props: MerchantProductCardProps) {
  const { isMobile, ...otherProps } = props;
  if (isMobile) {
    return <MerchantProductCardMobile {...otherProps} />;
  }
  return <MerchantProductCardDesktop {...otherProps} />;
}

export type MerchantProductCardSkeletonProps =
  | ({ isMobile: false } & MerchantProductSkeletonDesktopProps)
  | ({ isMobile: true } & MerchantProductSkeletonMobileProps);

export function MerchantProductCardSkeleton(
  props: MerchantProductCardSkeletonProps
) {
  const { isMobile, ...otherProps } = props;
  if (isMobile) {
    return <MerchantProductSkeletonMobile {...otherProps} />;
  }
  return <MerchantProductSkeletonDesktop {...otherProps} />;
}
