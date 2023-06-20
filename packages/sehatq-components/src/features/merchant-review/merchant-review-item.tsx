import React from "react";
import {
  MerchantReviewItemDesktop,
  MerchantReviewItemDesktopProps,
  MerchantReviewItemDesktopSkeleton,
} from "./merchant-review-item-desktop";
import {
  MerchantReviewItemMobile,
  MerchantReviewItemMobileProps,
  MerchantReviewItemMobileSkeleton,
} from "./merchant-review-item-mobile";

export type MerchantReviewItemProps =
  | ({
      isMobile: true;
    } & MerchantReviewItemMobileProps)
  | ({ isMobile: false } & MerchantReviewItemDesktopProps);

export type MerchantReviewItemSkeletonProps = {
  isMobile?: boolean;
};

export function MerchantReviewItem(props: MerchantReviewItemProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <MerchantReviewItemMobile {...otherProps} />;
  }

  return <MerchantReviewItemDesktop {...otherProps} />;
}

export function MerchantReviewItemSkeleton(
  props: MerchantReviewItemSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <MerchantReviewItemMobileSkeleton />;

  return <MerchantReviewItemDesktopSkeleton />;
}
