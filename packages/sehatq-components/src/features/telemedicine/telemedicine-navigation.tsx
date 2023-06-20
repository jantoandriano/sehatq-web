import React from "react";
import { TelemedicineNavigationDesktop } from "./telemedicine-navigation-desktop";
import { TelemedicineNavigationMobile } from "./telemedicine-navigation-mobile";

export type TelemedicineNavigationProps = {
  isMobile?: boolean;
  activeNavigation?: "explore" | "speciality" | "promo" | "consultation";
};

export function TelemedicineNavigation(props: TelemedicineNavigationProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <TelemedicineNavigationMobile {...otherProps} />;
  }
  return <TelemedicineNavigationDesktop />;
}
