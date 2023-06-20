import React from "react";
import { EmptyMerchantReviewListMobile } from "./empty-merchant-review-list-mobile";

import { EmptyMerchantReviewListDesktop } from "./empty-merchant-review-list-desktop";

export type EmptyMerchantReviewListProps =
  | {
      isMobile: true;
    }
  | { isMobile: false };

export function EmptyMerchantReviewList(props: EmptyMerchantReviewListProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <EmptyMerchantReviewListMobile />;
  }
  return <EmptyMerchantReviewListDesktop />;
}
