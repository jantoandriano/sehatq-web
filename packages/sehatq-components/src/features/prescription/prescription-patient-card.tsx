import React from "react";

import {
  PrescriptionPatientCardMobile,
  PrescriptionPatientCardSkeletonMobile,
} from "./prescription-patient-card-mobile";
import {
  PrescriptionPatientCardDesktop,
  PrescriptionPatientCardSkeletonDesktop,
} from "./prescription-patient-card-desktop";
import { PrescriptionCache, useGetPrescription } from "./prescription-queries";

export type PrescriptionPatientCardProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

function selectTelemedicineDoctor(prescription: PrescriptionCache) {
  const { patient, notes } = prescription.data;
  return {
    ...patient,
    notes,
  };
}

export function PrescriptionPatientCard(props: PrescriptionPatientCardProps) {
  const { isMobile, prescriptionNo } = props;

  const { data: prescription, isLoading } = useGetPrescription(
    { prescriptionNo },
    { select: selectTelemedicineDoctor }
  );

  const newProps = {
    prescription,
  };

  if (isLoading) return <PrescriptionPatientCardSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <PrescriptionPatientCardMobile {...newProps} />;
  }
  return <PrescriptionPatientCardDesktop {...newProps} />;
}

export type PrescriptionPatientCardSkeletonProps = {
  isMobile?: boolean;
};

export function PrescriptionPatientCardSkeleton(
  props: PrescriptionPatientCardSkeletonProps
) {
  if (props.isMobile) return <PrescriptionPatientCardSkeletonMobile />;
  return <PrescriptionPatientCardSkeletonDesktop />;
}
