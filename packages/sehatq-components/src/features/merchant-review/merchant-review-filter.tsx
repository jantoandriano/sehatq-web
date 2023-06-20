import React from "react";
import {
  MerchantReviewFilterDesktop,
  MerchantReviewFilterDesktopProps,
} from "./merchant-review-filter-desktop";
import {
  MerchantReviewFilterMobile,
  MerchantReviewFilterMobileProps,
} from "./merchant-review-filter-mobile";

export type MerchantReviewFilterProps =
  | ({
      isMobile: true;
    } & MerchantReviewFilterMobileProps)
  | ({ isMobile: false } & MerchantReviewFilterDesktopProps);

export function MerchantReviewFilter(props: MerchantReviewFilterProps) {
  const {
    isMobile,
    filterActive,
    filterOptions = [
      { id: "", label: "Semua" },
      { id: "5", label: "5" },
      { id: "4", label: "4" },
      { id: "3", label: "3" },
      { id: "2", label: "2" },
      { id: "1", label: "1" },
    ],
    onChangeFilter,
  } = props;

  const otherProps = { filterActive, filterOptions, onChangeFilter };

  if (isMobile) {
    return <MerchantReviewFilterMobile {...otherProps} />;
  }

  return <MerchantReviewFilterDesktop {...otherProps} />;
}
