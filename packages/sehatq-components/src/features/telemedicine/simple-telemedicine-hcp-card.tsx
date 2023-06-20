import { generatePriceDisplay } from "@sehatq/utils";
import React from "react";
import {
  SimpleTelemedicineHCPCardDesktop,
  SimpleTelemedicineHCPCardDesktopSkeleton,
} from "./simple-telemedicine-hcp-card-desktop";
import {
  SimpleTelemedicineHCPCardMobile,
  SimpleTelemedicineHCPCardMobileSkeleton,
} from "./simple-telemedicine-hcp-card-mobile";

export type SimpleTelemedicineHCPCardProps = {
  isMobile?: boolean;
  doctorId: number;
  doctorSlug: string;
  doctorName: string;
  photoUrl: string;
  speciality: string;
  consultationFee: number;
  isMultiplePrice?: boolean;
  ratingAvg: number;
  ratingTotal: number | null;
  experience: string;
  indicator: string;
  isPrivateChannel?: boolean;
  isBookingChannel?: boolean;
  isHideButton?: boolean;
};

export function SimpleTelemedicineHCPCard(
  props: SimpleTelemedicineHCPCardProps
) {
  const { isMobile } = props;
  const otherProps = {
    ...props,
    indicatorColor:
      props.indicator == "green"
        ? "indicator.green"
        : props.indicator || "indicator.grey",
    consultationFee: generatePriceDisplay(props.consultationFee),
  };
  if (isMobile) {
    return <SimpleTelemedicineHCPCardMobile {...otherProps} />;
  }

  return <SimpleTelemedicineHCPCardDesktop {...otherProps} />;
}

export type SimpleTelemedicineHCPCardSkeletonProps = {
  isMobile: boolean;
};

export function SimpleTelemedicineHCPCardSkeleton(
  props: SimpleTelemedicineHCPCardSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <SimpleTelemedicineHCPCardMobileSkeleton />;
  }

  return <SimpleTelemedicineHCPCardDesktopSkeleton />;
}
