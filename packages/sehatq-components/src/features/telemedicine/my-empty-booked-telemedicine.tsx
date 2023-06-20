import React from "react";
import { MyEmptyBookedTelemedicineListDesktop } from "./my-empty-booked-telemedicine-list-desktop";
import { MyEmptyBookedTelemedicineListMobile } from "./my-empty-booked-telemedicine-list-mobile";

export type MyEmptyBookedTelemedicineListProps = {
  isMobile?: boolean;
};
export function MyEmptyBookedTelemedicineList(
  props: MyEmptyBookedTelemedicineListProps
) {
  if (props.isMobile) return <MyEmptyBookedTelemedicineListMobile />;
  return <MyEmptyBookedTelemedicineListDesktop />;
}
