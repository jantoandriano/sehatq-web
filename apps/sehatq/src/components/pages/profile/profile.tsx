import React from "react";
import { ProfileDesktop } from "./profile-desktop";
import { ProfileMobile } from "./profile-mobile";

export type ProfileProps = { isMobile: boolean };

export function Profile(props: ProfileProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <ProfileMobile />;
  }
  return <ProfileDesktop />;
}
