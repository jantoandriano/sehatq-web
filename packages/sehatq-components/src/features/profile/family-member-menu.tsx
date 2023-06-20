import React from "react";

import { NavigationValue, useNavigation } from "@sehatq/utils";
import { useDisclosure } from "../../user-interfaces";
import {
  useGetFamilyMembers,
  FamilyMembersCache,
} from "./family-members-queries";
import { FamilyMemberMenuDesktop } from "./family-member-menu-desktop";
import { FamilyMemberMenuMobile } from "./family-member-menu-mobile";

function selectFamilyMembers(familyMembers: FamilyMembersCache) {
  return [
    { id: "all", label: "Semua Keluarga" },
    ...familyMembers.map((familyMember) => ({
      id: `${familyMember.id}`,
      label: familyMember.name,
      photoUrl: familyMember.imgSrc,
    })),
  ];
}

function getFirstName(label: string) {
  if (label === "Semua Keluarga") {
    return label;
  }
  return label.split(" ")[0];
}

export type FamilyMemberMenuProps = {
  isMobile?: boolean;
  activeFamily?: string;
  navigationValue?: NavigationValue;
  popUpTitle?: string;
};

export function FamilyMemberMenu(props: FamilyMemberMenuProps) {
  const { navigate } = useNavigation();
  const {
    isMobile,
    activeFamily = "all",
    navigationValue = { name: "MY_TELEMEDICINES" },
    popUpTitle = "Pilih Aktivitas Anggota Keluarga",
  } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: familyMembers = [] } = useGetFamilyMembers(
    { includeMe: "1" },
    { select: selectFamilyMembers }
  );

  function onFamilyMemberClick(familyMember: typeof familyMembers[0]) {
    navigate(navigationValue.name, {
      ...navigationValue.query,
      userId: familyMember.id !== "all" ? familyMember.id : "all",
    });
    onClose();
  }

  const baseProps = {
    isOpen,
    onClose,
    onOpen,
    activeFamily,
    onFamilyMemberClick,
    familyMembers,
    getFirstName,
  };
  if (isMobile) {
    return <FamilyMemberMenuMobile {...baseProps} popUpTitle={popUpTitle} />;
  }
  return <FamilyMemberMenuDesktop {...baseProps} />;
}
