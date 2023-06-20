import React from "react";
import { PROFILE_MENUS } from "@sehatq/constants";
import { useGetProfile, ProfileCache } from "./profile-queries";
import { useGetEmployeeInfo, EmployeeInfoCache } from "./employee-info-queries";
import { MyMenuDesktop } from "./my-menu-desktop";
import { MyMenuMobile } from "./my-menu-mobile";

export type MyMenuProps = { isMobile: boolean };

const CORPORATE_MENU = [
  "PROFILE_FAMILY_LIST",
  "PROFILE_PRESCRIPTIONS",
  "MY_BOOKING_DOCTORS",
  "EXTERNAL_PROFILE_ORDER",
  "PROFILE_CORPORATE",
  "PROFILE_ECLAIM",
  "PROFILE_HEALTHRECORD_LIST",
] as const;

const PROFILE_MENU = [
  "PROFILE_FAMILY_LIST",
  "PROFILE_PRESCRIPTIONS",
  "MY_BOOKING_DOCTORS",
  "EXTERNAL_PROFILE_ORDER",
  "PROFILE_HEALTHRECORD_LIST",
] as const;

function selectMenuByUser(user: ProfileCache) {
  return user.id;
}

function selectEmployeeNumber(employee: EmployeeInfoCache) {
  return !!employee.employeeNumber;
}

export function MyMenu(props: MyMenuProps) {
  const { isMobile } = props;
  const { data: userId = null } = useGetProfile({ select: selectMenuByUser });
  const { data: isEmployee = false } = useGetEmployeeInfo({
    select: selectEmployeeNumber,
  });
  const menuProfile = userId
    ? isEmployee
      ? CORPORATE_MENU.map((menuItem) => ({
          ...PROFILE_MENUS[menuItem],
          userId: userId,
        }))
      : PROFILE_MENU.map((menuItem) => ({
          ...PROFILE_MENUS[menuItem],
          userId: userId,
        }))
    : [];

  if (isMobile) {
    return <MyMenuMobile menus={menuProfile} />;
  }
  return <MyMenuDesktop menus={menuProfile} />;
}
