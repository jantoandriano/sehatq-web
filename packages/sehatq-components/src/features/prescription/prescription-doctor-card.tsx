import React from "react";

import {
  PrescriptionDoctorCardMobile,
  PrescriptionDoctorCardSkeletonMobile,
} from "./prescription-doctor-card-mobile";
import {
  PrescriptionDoctorCardDesktop,
  PrescriptionDoctorCardSkeletonDesktop,
} from "./prescription-doctor-card-desktop";
import { PrescriptionCache, useGetPrescription } from "./prescription-queries";

export type PrescriptionDoctorCardProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

function selectTelemedicineDoctor(prescription: PrescriptionCache) {
  const { doctorInfo } = prescription.data;
  return doctorInfo?.name ? doctorInfo : null;
}

export function PrescriptionDoctorCard(props: PrescriptionDoctorCardProps) {
  const { isMobile, prescriptionNo } = props;

  const { data: prescription, isLoading } = useGetPrescription(
    { prescriptionNo },
    { select: selectTelemedicineDoctor }
  );

  if (isLoading) return <PrescriptionDoctorCardSkeleton isMobile={isMobile} />;
  if (!prescription) return null;

  const newProps = {
    prescription,
  };

  if (isMobile) {
    return <PrescriptionDoctorCardMobile {...newProps} />;
  }
  return <PrescriptionDoctorCardDesktop {...newProps} />;
}

export type PrescriptionDoctorCardSkeletonProps = {
  isMobile?: boolean;
};

export function PrescriptionDoctorCardSkeleton(
  props: PrescriptionDoctorCardSkeletonProps
) {
  if (props.isMobile) return <PrescriptionDoctorCardSkeletonMobile />;
  return <PrescriptionDoctorCardSkeletonDesktop />;
}
