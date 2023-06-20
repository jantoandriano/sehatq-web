import React from "react";
import {
  MedicalProcedureBannerDesktop,
  MedicalProcedureBannerDesktopProps,
  MedicalProcedureBannerSkeletonDesktop,
} from "./medical-procedure-banner-desktop";
import {
  MedicalProcedureBannerMobile,
  MedicalProcedureBannerMobileProps,
  MedicalProcedureBannerSkeletonMobile,
} from "./medical-procedure-banner-mobile";

export type MedicalProcedureBannerProps =
  | ({ isMobile: false } & MedicalProcedureBannerDesktopProps)
  | ({ isMobile: true } & MedicalProcedureBannerMobileProps);

export type MedicalProcedureBannerSkeletonProps = { isMobile: boolean };

export function MedicalProcedureBanner(props: MedicalProcedureBannerProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <MedicalProcedureBannerMobile {...props} />;
  }
  return <MedicalProcedureBannerDesktop {...props} />;
}

export function MedicalProcedureBannerSkeleton(
  props: MedicalProcedureBannerSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <MedicalProcedureBannerSkeletonMobile />;
  }
  return <MedicalProcedureBannerSkeletonDesktop />;
}
