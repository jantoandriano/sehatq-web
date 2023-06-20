import React from "react";
import {
  MyBookedTelemedicineCardDesktop,
  MyBookedTelemedicineCardDesktopSkeleton,
} from "./my-booked-telemedicine-card-desktop";
import {
  MyBookedTelemedicineCardGeneralProps,
  MyBookedTelemedicineCardMobile,
  MyBookedTelemedicineCardMobileSkeleton,
} from "./my-booked-telemedicine-card-mobile";

export type MyBookedTelemedicineCardProps =
  MyBookedTelemedicineCardGeneralProps & { isMobile?: boolean };

export function MyBookedTelemedicineCard(props: MyBookedTelemedicineCardProps) {
  if (props.isMobile) return <MyBookedTelemedicineCardMobile {...props} />;
  return <MyBookedTelemedicineCardDesktop {...props} />;
}

export type MyBookedTelemedicineCardSkeletonProps = {
  isMobile?: boolean;
};
export function MyBookedTelemedicineCardSkeleton(
  props: MyBookedTelemedicineCardSkeletonProps
) {
  if (props.isMobile) return <MyBookedTelemedicineCardMobileSkeleton />;
  return <MyBookedTelemedicineCardDesktopSkeleton />;
}
