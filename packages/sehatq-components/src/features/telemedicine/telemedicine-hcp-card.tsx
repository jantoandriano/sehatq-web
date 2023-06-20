import React from "react";
import {
  TelemedicineHCPCardDesktop,
  TelemedicineHCPCardDesktopSkeleton,
  TelemedicineHCPCardGeneralProps,
} from "./telemedicine-hcp-card-desktop";
import {
  TelemedicineHCPCardMobile,
  TelemedicineHCPCardMobileSkeleton,
} from "./telemedicine-hcp-card-mobile";

export type TelemedicineHCPCardProps = {
  isMobile?: boolean;
} & TelemedicineHCPCardGeneralProps;

export function TelemedicineHCPCard(props: TelemedicineHCPCardProps) {
  if (props.isMobile) {
    return <TelemedicineHCPCardMobile {...props} />;
  }
  return <TelemedicineHCPCardDesktop {...props} />;
}

export type TelemedicineHCPCardSkeletonProps = {
  isMobile?: boolean;
};

export function TelemedicineHCPCardSkeleton(
  props: TelemedicineHCPCardSkeletonProps
) {
  if (props.isMobile) {
    return <TelemedicineHCPCardMobileSkeleton />;
  }
  return <TelemedicineHCPCardDesktopSkeleton />;
}
