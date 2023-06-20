import { generatePriceDisplay } from "@sehatq/utils";
import React from "react";
import {
  TelemedicineLandingHCPCardDesktop,
  TelemedicineLandingHCPCardDesktopSkeleton,
} from "./telemedicine-landing-hcp-card-desktop";
import {
  TelemedicineLandingHCPCardMobile,
  TelemedicineLandingHCPCardMobileSkeleton,
} from "./telemedicine-landing-hcp-card-mobile";

export type TelemedicineLandingHCPCardProps = {
  isMobile?: boolean;
  doctorId: number;
  doctorName: string;
  doctorSlug: string;
  speciality: string;
  hcfName: string;
  photoUrl: string;
  experience: string;
  indicator: string;
  consultationFee: number;
  consultationStrikeFee: number | undefined;
  ratingAvg: number;
  ratingTotal: number | null;
};

export function TelemedicineLandingHCPCard(
  props: TelemedicineLandingHCPCardProps
) {
  const { isMobile } = props;

  const otherProps = {
    ...props,
    consultationFee: generatePriceDisplay(props.consultationFee),
    consultationStrikeFee: props.consultationStrikeFee
      ? generatePriceDisplay(props.consultationStrikeFee)
      : undefined,
  };
  if (isMobile) {
    return <TelemedicineLandingHCPCardMobile {...otherProps} />;
  }
  return <TelemedicineLandingHCPCardDesktop {...otherProps} />;
}

export type TelemedicineLandingHCPCardSkeletonProps = {
  isMobile: boolean;
};

export function TelemedicineLandingHCPCardSkeleton(
  props: TelemedicineLandingHCPCardSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <TelemedicineLandingHCPCardMobileSkeleton />;
  }
  return <TelemedicineLandingHCPCardDesktopSkeleton />;
}
