import React from "react";
import {
  MyHealthServiceAppointmentInfoCardDesktop,
  MyHealthServiceAppointmentInfoCardDesktopProps,
  MyHealthServiceAppointmentInfoCardSkeletonDesktop,
} from "./my-health-service-appointment-info-card-desktop";
import {
  MyHealthServiceAppointmentInfoCardMobile,
  MyHealthServiceAppointmentInfoCardMobileProps,
  MyHealthServiceAppointmentInfoCardSkeletonMobile,
} from "./my-health-service-appointment-info-card-mobile";

export type MyHealthServiceAppointmentInfoCardProps =
  | ({ isMobile: false } & MyHealthServiceAppointmentInfoCardDesktopProps)
  | ({ isMobile: true } & MyHealthServiceAppointmentInfoCardMobileProps);

export function MyHealthServiceAppointmentInfoCard(
  props: MyHealthServiceAppointmentInfoCardProps
) {
  if (props.isMobile) {
    return <MyHealthServiceAppointmentInfoCardMobile {...props} />;
  }
  return <MyHealthServiceAppointmentInfoCardDesktop {...props} />;
}

export type MyHealthServiceAppointmentInfoCardSkeletonProps = {
  isMobile: boolean;
};

export function MyHealthServiceAppointmentInfoCardSkeleton(
  props: MyHealthServiceAppointmentInfoCardSkeletonProps
) {
  if (props.isMobile) {
    return <MyHealthServiceAppointmentInfoCardSkeletonMobile />;
  }
  return <MyHealthServiceAppointmentInfoCardSkeletonDesktop />;
}
