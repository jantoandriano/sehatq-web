import React from "react";
import { useGetProfile, ProfileCache } from "./profile-queries";
import { useGetFamilyMembers } from "./family-members-queries";
import { FamilyMembersCardDesktop } from "./family-members-card-desktop";
import { FamilyMembersCardMobile } from "./family-members-card-mobile";

function selectProfileId(profile: ProfileCache) {
  return profile.id;
}

export type FamilyMembersCardProps = {
  isMobile: boolean;
  title: string;
  desc: string;
};

export function FamilyMembersCard(props: FamilyMembersCardProps) {
  const { isMobile, ...otherProps } = props;
  const { data } = useGetFamilyMembers({ includeMe: "1" });
  const { data: userId } = useGetProfile({ select: selectProfileId });
  const profileId = userId ? userId : 1;
  const familyMembers = data ? data : [];

  if (isMobile) {
    return (
      <FamilyMembersCardMobile
        {...otherProps}
        familyMembers={familyMembers}
        profileId={profileId}
      />
    );
  }
  return (
    <FamilyMembersCardDesktop
      {...otherProps}
      familyMembers={familyMembers}
      profileId={profileId}
    />
  );
}
