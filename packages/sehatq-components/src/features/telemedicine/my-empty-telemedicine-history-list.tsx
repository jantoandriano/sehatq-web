import React from "react";
import { MyEmptyTelemedicineHistoryListDesktop } from "./my-empty-telemedicine-history-list-desktop";
import { MyEmptyTelemedicineHistoryListMobile } from "./my-empty-telemedicine-history-list-mobile";

export type MyEmptyTelemedicineHistoryListProps = {
  isMobile?: boolean;
};
export function MyEmptyTelemedicineHistoryList(
  props: MyEmptyTelemedicineHistoryListProps
) {
  if (props.isMobile) return <MyEmptyTelemedicineHistoryListMobile />;
  return <MyEmptyTelemedicineHistoryListDesktop />;
}
