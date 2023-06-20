import React from "react";
import {
  MyMentalRecordCardDesktop,
  MyMentalRecordCardSkeletonDesktop,
  MyMentalRecordCardDesktopProps,
} from "./my-mental-record-card-desktop";
import {
  MyMentalRecordCardMobile,
  MyMentalRecordCardMobileProps,
  MyMentalRecordCardSkeletonMobile,
} from "./my-mental-record-card-mobile";

export type MyMentalRecordCardProps =
  | ({ isMobile: false } & MyMentalRecordCardDesktopProps)
  | ({ isMobile: true } & MyMentalRecordCardMobileProps);

export function MyMentalRecordCard(props: MyMentalRecordCardProps) {
  if (props.isMobile) {
    return <MyMentalRecordCardMobile {...props} />;
  }
  return <MyMentalRecordCardDesktop {...props} />;
}

export type MyMentalRecordCardSkeletonProps = { isMobile: boolean };

export function MyMentalRecordCardSkeleton(
  props: MyMentalRecordCardSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <MyMentalRecordCardSkeletonMobile />;
  }
  return <MyMentalRecordCardSkeletonDesktop />;
}
