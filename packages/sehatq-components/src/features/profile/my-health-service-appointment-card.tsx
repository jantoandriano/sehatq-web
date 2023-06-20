import React from "react";
import {
  MyHealthServiceAppointmentCardDesktop,
  MyHealthServiceAppointmentCardDesktopProps,
  MyHealthServiceAppointmentCardSkeletonDesktop,
} from "./my-health-service-appointment-card-desktop";
import {
  MyHealthServiceAppointmentCardMobile,
  MyHealthServiceAppointmentCardMobileProps,
  MyHealthServiceAppointmentCardSkeletonMobile,
} from "./my-health-service-appointment-card-mobile";

export type MyHealthServiceAppointmentCardProps =
  | ({ isMobile: false } & MyHealthServiceAppointmentCardDesktopProps)
  | ({ isMobile: true } & MyHealthServiceAppointmentCardMobileProps);
export type MyHealthServiceAppointmentCardSkeletonProps = { isMobile: boolean };

export function MyHealthServiceAppointmentCard(
  props: MyHealthServiceAppointmentCardProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <MyHealthServiceAppointmentCardMobile {...props} />;
  }
  return <MyHealthServiceAppointmentCardDesktop {...props} />;
}

export function MyHealthServiceAppointmentCardSkeleton(
  props: MyHealthServiceAppointmentCardSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <MyHealthServiceAppointmentCardSkeletonMobile />;
  }
  return <MyHealthServiceAppointmentCardSkeletonDesktop />;
}
