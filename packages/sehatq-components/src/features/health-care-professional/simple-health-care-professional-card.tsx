import React from "react";
import {
  SimpleHealthCareProfessionalCardDesktop,
  SimpleHealthCareProfessionalCardDesktopProps,
  SimpleHealthCareProfessionalCardDesktopSkeleton,
} from "./simple-health-care-professional-card-desktop";
import {
  SimpleHealthCareProfessionalCardMobile,
  SimpleHealthCareProfessionalCardMobileProps,
  SimpleHealthCareProfessionalCardMobileSkeleton,
} from "./simple-health-care-professional-card-mobile";
export type SimpleHealthCareProfessionalCardProps =
  | ({
      isMobile: true;
    } & SimpleHealthCareProfessionalCardMobileProps)
  | ({
      isMobile?: false;
    } & SimpleHealthCareProfessionalCardDesktopProps);

export function SimpleHealthCareProfessionalCard(
  props: SimpleHealthCareProfessionalCardProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <SimpleHealthCareProfessionalCardMobile {...props} />;
  }
  return <SimpleHealthCareProfessionalCardDesktop {...props} />;
}

export type SimpleHealthCareProfessionalCardSkeletonProps = {
  isMobile?: boolean;
};

export function SimpleHealthCareProfessionalCardSkeleton(
  props: SimpleHealthCareProfessionalCardSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <SimpleHealthCareProfessionalCardMobileSkeleton />;
  }
  return <SimpleHealthCareProfessionalCardDesktopSkeleton />;
}
