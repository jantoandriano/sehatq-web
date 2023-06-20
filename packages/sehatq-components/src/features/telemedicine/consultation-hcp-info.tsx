import { ASSETS } from "@sehatq/constants";
import { priceFormat } from "@sehatq/utils";
import React from "react";

import {
  ConsultationHCPInfoDesktop,
  ConsultationHCPInfoDesktopSkeleton,
} from "./consultation-hcp-info-desktop";
import {
  ConsultationHCPInfoMobile,
  ConsultationHCPInfoMobileSkeleton,
} from "./consultation-hcp-info-mobile";
import { ConsultationCache, useGetConsultation } from "./consultation-queries";

export type ConsultationHCPInfoProps = {
  isMobile?: boolean;
  consultationId: number;
};

function selectConsultation(cache: ConsultationCache) {
  return cache.data;
}

export function ConsultationHCPInfo(props: ConsultationHCPInfoProps) {
  const { data, isLoading } = useGetConsultation(
    {
      consultationId: `${props.consultationId}`,
    },
    {
      select: selectConsultation,
    }
  );

  if (isLoading) {
    return <ConsultationHCPInfoSkeleton isMobile={props.isMobile} />;
  }

  if (!data?.doctor) {
    return null;
  }

  const otherProps = {
    doctorName: data.doctor.name,
    doctorSlug: data.doctor.slug,
    doctorImageUrl: data.doctor.photoUrl || ASSETS.NO_IMAGE,
    speciality: data.doctor.speciality.name,
    experience: data.doctor.experience,
    consultationFee: data.payment
      ? priceFormat(data.payment.consultationFee)
      : "Gratis",
    hcfName: data.doctor.hospital?.name ?? "",
  };

  if (props.isMobile) {
    return <ConsultationHCPInfoMobile {...otherProps} />;
  }

  return <ConsultationHCPInfoDesktop {...otherProps} />;
}

export type ConsultationHCPInfoSkeletonProps = {
  isMobile?: boolean;
};

export function ConsultationHCPInfoSkeleton(
  props: ConsultationHCPInfoSkeletonProps
) {
  if (props.isMobile) {
    return <ConsultationHCPInfoMobileSkeleton />;
  }

  return <ConsultationHCPInfoDesktopSkeleton />;
}
