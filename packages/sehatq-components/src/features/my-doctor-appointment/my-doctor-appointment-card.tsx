import React from "react";
import {
  MyDoctorAppointmentCardDesktop,
  MyDoctorAppointmentCardDesktopProps,
  MyDoctorAppointmentCardSkeletonDesktop,
} from "./my-doctor-appointment-card-desktop";
import {
  MyDoctorAppointmentCardMobile,
  MyDoctorAppointmentCardMobileProps,
  MyDoctorAppointmentCardSkeletonMobile,
} from "./my-doctor-appointment-card-mobile";

export type MyDoctorAppointmentCardProps =
  | ({
      isMobile: true;
    } & MyDoctorAppointmentCardMobileProps)
  | ({ isMobile: false } & MyDoctorAppointmentCardDesktopProps);

export type MyDoctorAppointmentCardSkeletonProps = {
  isMobile?: boolean;
};

export function MyDoctorAppointmentCard(props: MyDoctorAppointmentCardProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <MyDoctorAppointmentCardMobile {...otherProps} />;
  }

  return <MyDoctorAppointmentCardDesktop {...otherProps} />;
}

export function MyDoctorAppointmentCardSkeleton(
  props: MyDoctorAppointmentCardSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <MyDoctorAppointmentCardSkeletonMobile />;

  return <MyDoctorAppointmentCardSkeletonDesktop />;
}
