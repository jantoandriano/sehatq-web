import React from "react";
import {
  RegularTelemedicineInfoMobile,
  RegularTelemedicineInfoMobileProps,
} from "./regular-telemedicine-info-mobile";
import {
  RegularTelemedicineInfoDesktop,
  RegularTelemedicineInfoDesktopProps,
} from "./regular-telemedicine-info-desktop";

export type RegularTelemedicineInfoProps =
  | ({ isMobile: false } & RegularTelemedicineInfoDesktopProps)
  | ({ isMobile: true } & RegularTelemedicineInfoMobileProps);

export function RegularTelemedicineInfo(props: RegularTelemedicineInfoProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <RegularTelemedicineInfoMobile {...props} />;
  }
  return <RegularTelemedicineInfoDesktop {...props} />;
}
