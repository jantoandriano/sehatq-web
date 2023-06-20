import React, { useState } from "react";
import { useAssets } from "@sehatq/utils";

import {
  ProfileCardDesktop,
  ProfileCardSkeletonDesktop,
} from "./profile-card-desktop";
import { useGetProfile } from "./profile-queries";

export function ProfileCard() {
  const { data } = useGetProfile();
  const [isBrokenAvatar, setIsBrokenAvatar] = useState(false);

  const ASSETS = useAssets([
    "PROFILE_PLACEHOLDER_MAN",
    "PROFILE_PLACEHOLDER_WOMAN",
  ]);
  const placeholderImage =
    data?.gender === "f"
      ? ASSETS.PROFILE_PLACEHOLDER_WOMAN
      : ASSETS.PROFILE_PLACEHOLDER_MAN;
  const avatarSrc =
    !isBrokenAvatar && data?.imageSrc ? data.imageSrc : placeholderImage;

  const profileNavigation = {
    name: "EDIT_PROFILE" as const,
    query: data ? { userId: `${data.id}` } : undefined,
  };

  function onAvatarError() {
    setIsBrokenAvatar(true);
  }

  if (!data) {
    return <ProfileCardSkeletonDesktop />;
  }

  return (
    <ProfileCardDesktop
      {...data}
      avatarSrc={avatarSrc}
      profileNavigation={profileNavigation}
      onAvatarError={onAvatarError}
    />
  );
}
