import { NavigationValue } from "@sehatq/utils";
import React from "react";
import {
  FamilyMemberListDesktop,
  FamilyMemberListDesktopSkeleton,
} from "./family-member-list-desktop";
import {
  FamilyMemberListMobile,
  FamilyMemberListMobileSkeleton,
} from "./family-member-list-mobile";
import {
  FamilyMembersCache,
  useGetFamilyMembers,
} from "./family-members-queries";

export type FamilyMemberListProps = {
  isMobile?: boolean;
  selectedValue?: string;
  navigationValue?: NavigationValue;
};

function selectFamilyMembers(familyMembers: FamilyMembersCache) {
  return [
    ...familyMembers.map((familyMember) => ({
      id: `${familyMember.id}`,
      name: familyMember.name,
      photoUrl: familyMember.imgSrc,
      relation: familyMember.relation,
    })),
  ];
}

export function FamilyMemberList(props: FamilyMemberListProps) {
  const { data: familyMembers = [], isLoading } = useGetFamilyMembers(
    { includeMe: "1" },
    { select: selectFamilyMembers }
  );

  if (isLoading) {
    if (props.isMobile) return <FamilyMemberListMobileSkeleton />;
    return <FamilyMemberListDesktopSkeleton />;
  }

  if (props.isMobile)
    return (
      <FamilyMemberListMobile
        members={familyMembers}
        selectedValue={props.selectedValue}
        navigationValue={props.navigationValue}
      />
    );

  return (
    <FamilyMemberListDesktop
      members={familyMembers}
      selectedValue={props.selectedValue}
      navigationValue={props.navigationValue}
    />
  );
}
