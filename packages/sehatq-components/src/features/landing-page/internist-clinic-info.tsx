import React from "react";

import {
  InternistClinicInfoDesktop,
  InternistClinicInfoSkeletonDesktop,
} from "./internist-clinic-info-desktop";
import {
  InternistClinicInfoMobile,
  InternistClinicInfoSkeletonMobile,
} from "./internist-clinic-info-mobile";

export type InternistClinicInfoProps = { isMobile: boolean };
export type InternistClinicInfoSkeletonProps = { isMobile: boolean };

export function InternistClinicInfo(props: InternistClinicInfoProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicInfoMobile />;
  }
  return <InternistClinicInfoDesktop />;
}

export function InternistClinicInfoSkeleton(
  props: InternistClinicInfoSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicInfoSkeletonMobile />;
  }
  return <InternistClinicInfoSkeletonDesktop />;
}
