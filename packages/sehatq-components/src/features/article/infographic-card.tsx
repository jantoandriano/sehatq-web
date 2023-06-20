import React from "react";
import {
  InfographicCardDesktop,
  InfographicCardDesktopProps,
  InfographicCardDesktopSkeleton,
} from "./infographic-card-desktop";
import {
  InfographicCardMobile,
  InfographicCardMobileProps,
  InfographicCardMobileSkeleton,
} from "./infographic-card-mobile";

export type InfographicCardProps =
  | ({
      isMobile: true;
    } & InfographicCardMobileProps)
  | ({ isMobile: false } & InfographicCardDesktopProps);

export type InfographicCardSkeletonProps = {
  isMobile?: boolean;
};

export function InfographicCard(props: InfographicCardProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <InfographicCardMobile {...props} />;
  }

  return <InfographicCardDesktop {...props} />;
}

export function InfographicCardSkeleton(props: InfographicCardSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <InfographicCardMobileSkeleton />;

  return <InfographicCardDesktopSkeleton />;
}
