import React from "react";
import {
  PatientInfoCardDesktop,
  PatientInfoCardSkeletonDesktop,
  PatientInfoCardDesktopProps,
} from "./patient-info-card-desktop";
import {
  PatientInfoCardMobile,
  PatientInfoCardSkeletonMobile,
  PatientInfoCardMobileProps,
} from "./patient-info-card-mobile";

export type PatientInfoCardProps =
  | ({ isMobile: false } & PatientInfoCardDesktopProps)
  | ({ isMobile: true } & PatientInfoCardMobileProps);

export function PatientInfoCard(props: PatientInfoCardProps) {
  if (props.isMobile) {
    return <PatientInfoCardMobile {...props} />;
  }
  return <PatientInfoCardDesktop {...props} />;
}

export type PatientInfoCardSkeletonProps = { isMobile: boolean };

export function PatientInfoCardSkeleton(props: PatientInfoCardSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <PatientInfoCardSkeletonMobile />;
  }
  return <PatientInfoCardSkeletonDesktop />;
}
