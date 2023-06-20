import React from "react";
import { CountDownSectionMobile } from "./count-down-mobile";
import { CountDownSectionDesktop } from "./count-down-desktop";

type CountDownSectionProps = {
  isMobile?: boolean;
  paymentType: string;
  expiredTime: string;
};

export function CountDownSection(props: CountDownSectionProps) {
  if (props.isMobile) {
    return <CountDownSectionMobile {...props} />;
  }

  return <CountDownSectionDesktop {...props} />;
}
