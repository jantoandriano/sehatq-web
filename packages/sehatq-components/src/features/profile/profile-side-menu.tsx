import React from "react";
import { ProfileSideMenuDesktop } from "./profile-side-menu-desktop";
import { ProfileSideMenuMobile } from "./profile-side-menu-mobile";

export type ProfileSideMenuProps = { isMobile: boolean };

export function ProfileSideMenu(props: ProfileSideMenuProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ProfileSideMenuMobile />;
  }
  return <ProfileSideMenuDesktop />;
}
