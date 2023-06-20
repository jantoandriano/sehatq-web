import React from "react";

import {
  PrescriptionInfoCardMobile,
  PrescriptionInfoCardSkeletonMobile,
} from "./prescription-info-card-mobile";
import {
  PrescriptionInfoCardDesktop,
  PrescriptionInfoCardSkeletonDesktop,
} from "./prescription-info-card-desktop";
import { PrescriptionCache, useGetPrescription } from "./prescription-queries";

export type PrescriptionInfoCardProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

function selectPrescription(prescription: PrescriptionCache) {
  const {
    status,
    number,
    createdAt,
    expiredAt,
    source,
    orders,
    rejectionReason,
  } = prescription.data;
  return {
    number,
    status: status.id,
    createdAt,
    expiredAt,
    source,
    rejectionReason: rejectionReason ?? "-",
    onlineFlow: orders.merchantName === "Toko SehatQ",
  };
}

export function PrescriptionInfoCard(props: PrescriptionInfoCardProps) {
  const { isMobile, prescriptionNo } = props;

  const { data: prescription, isLoading } = useGetPrescription(
    { prescriptionNo },
    { select: selectPrescription }
  );

  const newProps = {
    prescription,
  };

  if (isLoading) return <PrescriptionInfoCardSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <PrescriptionInfoCardMobile {...newProps} />;
  }
  return <PrescriptionInfoCardDesktop {...newProps} />;
}

export type PrescriptionInfoCardSkeletonProps = {
  isMobile?: boolean;
};

export function PrescriptionInfoCardSkeleton(
  props: PrescriptionInfoCardSkeletonProps
) {
  if (props.isMobile) return <PrescriptionInfoCardSkeletonMobile />;
  return <PrescriptionInfoCardSkeletonDesktop />;
}
