import React from "react";

import { NavigationValue, useNavigation } from "@sehatq/utils";
import {
  useGetFamilyMembers,
  FamilyMembersCache,
} from "./family-members-queries";
import { useGetProfile, ProfileCache } from "./profile-queries";
import {
  FamilyMemberSliderDesktop,
  FamilyMemberSliderDesktopSkeleton,
} from "./family-member-slider-desktop";
import {
  FamilyMemberSliderMobile,
  FamilyMemberSliderMobileSkeleton,
} from "./family-member-slider-mobile";

function selectFamilyMembers(familyMembers: FamilyMembersCache) {
  return familyMembers.map((familyMember) => ({
    id: `${familyMember.id}`,
    uuid: familyMember.uuid,
    label: familyMember.name,
    photoUrl: familyMember.imgSrc,
    gender: familyMember.gender,
  }));
}

function selectProfileId(profile: ProfileCache) {
  return `${profile.id}`;
}

export type FamilyMemberSliderProps = {
  isMobile?: boolean;
  userId?: string;
  dateRange?: string;
  navigationValue?: NavigationValue;
  onChangeProfile?: (value: FamilyMembersProps) => void;
};

export type FamilyMembersProps = {
  id?: string;
  uuid?: string;
  label?: string;
  photoUrl?: string;
};

export function FamilyMemberSlider(props: FamilyMemberSliderProps) {
  const { navigate } = useNavigation();
  const {
    isMobile,
    userId = "",
    dateRange = "",
    navigationValue = { name: "MY_MENTAL_RECORDS" },
    onChangeProfile = null,
  } = props;

  const {
    data: familyMembers = [],
    isLoading,
    error,
  } = useGetFamilyMembers({ includeMe: "1" }, { select: selectFamilyMembers });

  const { data: profileId } = useGetProfile({ select: selectProfileId });

  function onFamilyMemberClick(familyMember: typeof familyMembers[0]) {
    if (onChangeProfile) {
      onChangeProfile(familyMember);
    } else {
      navigate(navigationValue.name, {
        userId: familyMember.id,
        dateRange,
      });
    }
  }

  if (error) {
    return null;
  }

  if (isLoading) {
    return <FamilyMemberSliderSkeleton isMobile={isMobile} />;
  }

  const baseProps = {
    userId: userId || profileId,
    familyMembers,
    onFamilyMemberClick,
  };

  if (isMobile) {
    return <FamilyMemberSliderMobile {...baseProps} />;
  }
  return <FamilyMemberSliderDesktop {...baseProps} />;
}

export type FamilyMemberSliderSkeletonProps = {
  isMobile?: boolean;
};

export function FamilyMemberSliderSkeleton(
  props: FamilyMemberSliderSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <FamilyMemberSliderMobileSkeleton />;

  return <FamilyMemberSliderDesktopSkeleton />;
}
