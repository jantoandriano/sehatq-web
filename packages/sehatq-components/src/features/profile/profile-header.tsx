import React from "react";
import {
  ProfileHeaderDesktop,
  ProfileHeaderDesktopProps,
} from "./profile-header-desktop";
import {
  ProfileHeaderMobile,
  ProfileHeaderMobileProps,
} from "./profile-header-mobile";

export type ProfileHeaderProps =
  | ({ isMobile: false } & ProfileHeaderDesktopProps)
  | ({ isMobile: true } & ProfileHeaderMobileProps);

export function ProfileHeader(props: ProfileHeaderProps) {
  const { isMobile, ...otherProps } = props;
  if (isMobile) {
    return <ProfileHeaderMobile {...otherProps} />;
  }
  return <ProfileHeaderDesktop {...otherProps} />;
}
