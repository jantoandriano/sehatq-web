import { ASSETS } from "@sehatq/constants";
import React, { useState } from "react";
import {
  FamilyMembersCache,
  useGetFamilyMembers,
} from "../profile/family-members-queries";
import { useDisclosure } from "../../user-interfaces";
import {
  FamilyInputDesktop,
  FamilyInputDesktopSkeleton,
} from "./family-input-desktop";
import {
  FamilyInputMobile,
  FamilyInputMobileSkeleton,
} from "./family-input-mobile";

export type FamilySelectedData = {
  userId: number;
  name: string;
  photoUrl: string;
  age: number;
  relation: string;
  height: number;
  weight: number;
  birthDate: Date | undefined;
  phone: string | null;
  address: string | null;
  identityNumber: string | null;
  gender: "m" | "f" | "";
  uuid: string;
};

export type FamilyInputProps = {
  value?: number;
  onChange: (selectedData: FamilySelectedData | undefined) => void;
  isError?: boolean;
  isMobile?: boolean;
  labelButton?: string;
  hasGuest?: boolean;
  creatable?: boolean;
  title?: string;
};

function selectFamily(data: FamilyMembersCache) {
  return [
    ...data.map((familyMember) => ({
      userId: familyMember.id,
      name: familyMember.name,
      photoUrl: familyMember.imgSrc || ASSETS.NO_IMAGE,
      age: familyMember.age,
      relation: familyMember.relation,
      height: familyMember.height,
      weight: familyMember.weight,
      birthDate: familyMember.birthDate,
      phone: familyMember.phone,
      address: familyMember.address,
      identityNumber: familyMember.identityNumber,
      gender: familyMember.gender,
      uuid: familyMember.uuid,
    })),
  ];
}

export function FamilyInput(props: FamilyInputProps) {
  const {
    value,
    onChange,
    isMobile,
    isError,
    labelButton = "Pilih Keluarga",
    title = "Pilih Keluarga",
    creatable = false,
    hasGuest = false,
  } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenFamilyForm,
    onClose: onCloseFamilyForm,
    onOpen: onOpenFamilyForm,
  } = useDisclosure();
  const [prevValue, setPrevValue] = useState(value);
  const { data: options = [], isLoading } = useGetFamilyMembers(
    { includeMe: "1" },
    {
      select: selectFamily,
    }
  );

  if (value !== prevValue) {
    setPrevValue(value);
  }

  if (isLoading) {
    return <FamilyInputSkeleton isMobile={isMobile} />;
  }

  const defaultProps = {
    options,
    isError,
    onChange,
    value: options.find((f) => f.userId == value),
    labelButton,
    hasGuest,
    creatable,
    title,

    isOpenFamilyForm,
    onCloseFamilyForm,
    onOpenFamilyForm,
  };

  if (isMobile) {
    const mobileProps = {
      isOpen,
      onClose,
      onOpen,
      ...defaultProps,
    };
    return <FamilyInputMobile {...mobileProps} />;
  }

  return <FamilyInputDesktop {...defaultProps} />;
}

export type FamilyInputSkeletonProps = {
  isMobile?: boolean;
};

export function FamilyInputSkeleton(props: FamilyInputSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <FamilyInputMobileSkeleton />;
  }
  return <FamilyInputDesktopSkeleton />;
}
