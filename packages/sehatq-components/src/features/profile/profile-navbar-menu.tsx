import React from "react";
import { logout } from "@sehatq/utils";
import { ProfileNavbarMenuDesktop } from "./profile-navbar-menu-desktop";
import { ProfileCache, useGetProfile } from "./profile-queries";

function selectUser(response: ProfileCache) {
  return {
    imgSrc: response.imageSrc,
    gender: response.gender,
  };
}

export function ProfileNavbarMenu() {
  const { data: user } = useGetProfile({
    select: selectUser,
  });

  const otherProps = {
    logout,
    ...user,
  };

  return <ProfileNavbarMenuDesktop {...otherProps} />;
}
