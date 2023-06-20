import React from "react";
import {
  MyPrescriptionCardDesktop,
  MyPrescriptionCardDesktopProps,
  MyPrescriptionCardSkeletonDesktop,
} from "./my-prescription-card-desktop";
import {
  MyPrescriptionCardMobile,
  MyPrescriptionCardMobileProps,
  MyPrescriptionCardSkeletonMobile,
} from "./my-prescription-card-mobile";

export type MyPrescriptionCardProps =
  | ({ isMobile: false } & MyPrescriptionCardDesktopProps)
  | ({ isMobile: true } & MyPrescriptionCardMobileProps);

export function MyPrescriptionCard(props: MyPrescriptionCardProps) {
  const { isMobile } = props;

  if (isMobile) return <MyPrescriptionCardMobile {...props} />;

  return <MyPrescriptionCardDesktop {...props} />;
}

export type MyPrescriptionCardSkeletonProps = {
  isMobile?: boolean;
};

export function MyPrescriptionCardSkeleton(
  props: MyPrescriptionCardSkeletonProps
) {
  if (props.isMobile) return <MyPrescriptionCardSkeletonMobile />;
  return <MyPrescriptionCardSkeletonDesktop />;
}
