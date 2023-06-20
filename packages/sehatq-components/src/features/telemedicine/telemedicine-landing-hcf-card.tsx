import React from "react";
import {
  TelemedicineLandingHCFCardDesktop,
  TelemedicineLandingHCFCardDesktopSkeleton,
} from "./telemedicine-landing-hcf-card-desktop";
import {
  TelemedicineLandingHCFCardMobile,
  TelemedicineLandingHCFCardMobileSkeleton,
} from "./telemedicine-landing-hcf-card-mobile";

export type TelemedicineLandingHCFCardProps = {
  isMobile: boolean;
  name: string;
  logoUrl: string;
  slug: string;
};

export function TelemedicineLandingHCFCard(
  props: TelemedicineLandingHCFCardProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <TelemedicineLandingHCFCardMobile {...props} />;
  }
  return <TelemedicineLandingHCFCardDesktop {...props} />;
}

export type TelemedicineLandingHCFCardSkeletonProps = {
  isMobile: boolean;
};

export function TelemedicineLandingHCFCardSkeleton(
  props: TelemedicineLandingHCFCardSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <TelemedicineLandingHCFCardMobileSkeleton />;
  }
  return <TelemedicineLandingHCFCardDesktopSkeleton />;
}
