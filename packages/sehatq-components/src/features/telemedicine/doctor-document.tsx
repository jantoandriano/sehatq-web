import React from "react";
import { useDisclosure } from "../../user-interfaces";
import { useGetConsultation, ConsultationCache } from "./consultation-queries";
import {
  DoctorDocumentDesktop,
  DoctorDocumentSkeletonDesktop,
} from "./doctor-document-desktop";
import {
  DoctorDocumentMobile,
  DoctorDocumentSkeletonMobile,
} from "./doctor-document-mobile";

export type DoctorDocumentProps = {
  isMobile?: boolean;
  consultationId: string;
};

function selectConsultation(consultation: ConsultationCache) {
  const { doctorNote, recommendation } = consultation.data;
  return {
    hasDoctorNote: Boolean(doctorNote),
    hasPrescription: Boolean(recommendation),
  };
}

export function DoctorDocument(props: DoctorDocumentProps) {
  const { isMobile, consultationId } = props;
  const { data: consultation, isLoading } = useGetConsultation(
    { consultationId },
    { select: selectConsultation }
  );
  const doctorNotePopup = useDisclosure();

  const otherProps = {
    consultationId,
    doctorNotePopup,
    ...consultation,
  };

  if (isLoading) return <DoctorDocumentSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <DoctorDocumentMobile {...otherProps} />;
  }
  return <DoctorDocumentDesktop {...otherProps} />;
}

export type DoctorDocumentSkeletonProps = {
  isMobile?: boolean;
};

export function DoctorDocumentSkeleton(props: DoctorDocumentSkeletonProps) {
  if (props.isMobile) return <DoctorDocumentSkeletonMobile />;
  return <DoctorDocumentSkeletonDesktop />;
}
