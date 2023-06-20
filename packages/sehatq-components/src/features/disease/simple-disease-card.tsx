import React from "react";
import {
  SimpleDiseaseCardDesktop,
  SimpleDiseaseCardDesktopProps,
  DiseaseBannerSkeletonDesktop,
} from "./simple-disease-card-desktop";
import {
  SimpleDiseaseCardMobile,
  SimpleDiseaseCardMobileProps,
  DiseaseBannerSkeletonMobile,
} from "./simple-disease-card-mobile";

export type SimpleDiseaseCardProps =
  | ({ isMobile: false } & SimpleDiseaseCardDesktopProps)
  | ({ isMobile: true } & SimpleDiseaseCardMobileProps);

export type SimpleDiseaseCardSkeletonProps = { isMobile: boolean };

export function SimpleDiseaseCard(props: SimpleDiseaseCardProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <SimpleDiseaseCardMobile {...props} />;
  }
  return <SimpleDiseaseCardDesktop {...props} />;
}

export function SimpleDiseaseCardSkeleton(
  props: SimpleDiseaseCardSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <DiseaseBannerSkeletonMobile />;
  }
  return <DiseaseBannerSkeletonDesktop />;
}
