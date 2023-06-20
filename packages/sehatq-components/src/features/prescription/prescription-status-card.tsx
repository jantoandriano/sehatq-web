import React from "react";

import {
  PrescriptionStatusCardMobile,
  PrescriptionStatusCardSkeletonMobile,
} from "./prescription-status-card-mobile";
import {
  PrescriptionStatusCardDesktop,
  PrescriptionStatusCardSkeletonDesktop,
} from "./prescription-status-card-desktop";
import { PrescriptionCache, useGetPrescription } from "./prescription-queries";
import { PRESCRIPTION_STATUS } from "./prescription-constant";

export type PrescriptionStatusCardProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

function selectPrescription(prescription: PrescriptionCache) {
  const { status, number } = prescription.data;
  return {
    number,
    status: status.id,
    label: status.name,
    color: PRESCRIPTION_STATUS[status.id].color,
    backgroundColor: PRESCRIPTION_STATUS[status.id].backgroundColor,
    borderColor: PRESCRIPTION_STATUS[status.id].borderColor,
    activityStatus: status.activityMessage,
  };
}

export function PrescriptionStatusCard(props: PrescriptionStatusCardProps) {
  const { isMobile, prescriptionNo } = props;

  const { data: prescription, isLoading } = useGetPrescription(
    { prescriptionNo },
    { select: selectPrescription }
  );

  const newProps = {
    prescription,
  };

  if (isLoading) return <PrescriptionStatusCardSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <PrescriptionStatusCardMobile {...newProps} />;
  }
  return <PrescriptionStatusCardDesktop {...newProps} />;
}

export type PrescriptionStatusCardSkeletonProps = {
  isMobile?: boolean;
};

export function PrescriptionStatusCardSkeleton(
  props: PrescriptionStatusCardSkeletonProps
) {
  if (props.isMobile) return <PrescriptionStatusCardSkeletonMobile />;
  return <PrescriptionStatusCardSkeletonDesktop />;
}
