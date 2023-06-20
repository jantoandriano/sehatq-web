import React from "react";
import { MyVoucherBannerDesktop } from "./my-voucher-banner-desktop";
import { MyVoucherBannerMobile } from "./my-voucher-banner-mobile";

export type MyVoucherBannerProps = { isMobile: boolean; textLabel: string };

export function MyVoucherBanner(props: MyVoucherBannerProps) {
  const { isMobile, ...otherProps } = props;
  const myVoucherNavigation = "EXTERNAL_MY_VOUCHER";
  if (isMobile) {
    return (
      <MyVoucherBannerMobile
        {...otherProps}
        myVoucherNavigation={myVoucherNavigation}
      />
    );
  }
  return (
    <MyVoucherBannerDesktop
      {...otherProps}
      myVoucherNavigation={myVoucherNavigation}
    />
  );
}
