import React, { useState } from "react";
import { useAssets } from "@sehatq/utils";
import { useGetProfile } from "./profile-queries";
import {
  BasicProfileCardDesktop,
  BasicProfileCardSkeletonDesktop,
} from "./basic-profile-card-desktop";
import {
  BasicProfileCardMobile,
  BasicProfileCardSkeletonMobile,
} from "./basic-profile-card-mobile";

export type BasicProfileCardProps = {
  isMobile: boolean;
};

export function BasicProfileCard(props: BasicProfileCardProps) {
  const { isMobile } = props;
  const [isBrokenAvatar, setIsBrokenAvatar] = useState(false);
  const { data } = useGetProfile();

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
    name: "PROFILE_DETAIL" as const,
    query: data ? { userId: `${data.id}` } : undefined,
  };

  function onAvatarError() {
    setIsBrokenAvatar(true);
  }

  if (!data) {
    if (isMobile) {
      return <BasicProfileCardSkeletonMobile />;
    }
    return <BasicProfileCardSkeletonDesktop />;
  }

  if (isMobile) {
    return (
      <BasicProfileCardMobile
        {...data}
        profileNavigation={profileNavigation}
        avatarSrc={avatarSrc}
        onAvatarError={onAvatarError}
      />
    );
  }
  return (
    <BasicProfileCardDesktop
      {...data}
      avatarSrc={avatarSrc}
      profileNavigation={profileNavigation}
      onAvatarError={onAvatarError}
    />
  );
}
