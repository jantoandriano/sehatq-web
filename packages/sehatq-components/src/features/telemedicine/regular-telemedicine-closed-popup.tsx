import React from "react";
import {
  RegularTelemedicineClosedPopupMobile,
  RegularTelemedicineClosedPopupMobileProps,
} from "./regular-telemedicine-closed-popup-mobile";
import {
  RegularTelemedicineClosedPopupDesktop,
  RegularTelemedicineClosedPopupDesktopProps,
} from "./regular-telemedicine-closed-popup-desktop";

export type RegularTelemedicineClosedPopupProps =
  | ({ isMobile: false } & RegularTelemedicineClosedPopupDesktopProps)
  | ({ isMobile: true } & RegularTelemedicineClosedPopupMobileProps);

export function RegularTelemedicineClosedPopup(
  props: RegularTelemedicineClosedPopupProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <RegularTelemedicineClosedPopupMobile {...props} />;
  }
  return <RegularTelemedicineClosedPopupDesktop {...props} />;
}
