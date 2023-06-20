import React from "react";

import {
  PrescriptionAddressCardMobile,
  PrescriptionAddressCardSkeletonMobile,
} from "./prescription-address-card-mobile";
import {
  PrescriptionAddressCardDesktop,
  PrescriptionAddressCardSkeletonDesktop,
} from "./prescription-address-card-desktop";
import { PrescriptionCache, useGetPrescription } from "./prescription-queries";

export type PrescriptionAddressCardProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

function selectTelemedicineDoctor(prescription: PrescriptionCache) {
  const { shipping } = prescription.data;
  return shipping;
}

export function PrescriptionAddressCard(props: PrescriptionAddressCardProps) {
  const { isMobile, prescriptionNo } = props;

  const { data: prescription, isLoading } = useGetPrescription(
    { prescriptionNo },
    { select: selectTelemedicineDoctor }
  );

  const newProps = {
    prescription,
  };

  if (isLoading) return <PrescriptionAddressCardSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <PrescriptionAddressCardMobile {...newProps} />;
  }
  return <PrescriptionAddressCardDesktop {...newProps} />;
}

export type PrescriptionAddressCardSkeletonProps = {
  isMobile?: boolean;
};

export function PrescriptionAddressCardSkeleton(
  props: PrescriptionAddressCardSkeletonProps
) {
  if (props.isMobile) return <PrescriptionAddressCardSkeletonMobile />;
  return <PrescriptionAddressCardSkeletonDesktop />;
}
