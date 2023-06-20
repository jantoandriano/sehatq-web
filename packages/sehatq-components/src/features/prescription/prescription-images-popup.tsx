import React from "react";
import { useDisclosure } from "../../user-interfaces";
import {
  PrescriptionImagesPopupMobile,
  PrescriptionImagesPopupSkeletonMobile,
} from "./prescription-images-popup-mobile";
import {
  PrescriptionImagesPopupDesktop,
  PrescriptionImagesPopupSkeletonDesktop,
} from "./prescription-images-popup-desktop";
import { PrescriptionCache, useGetPrescription } from "./prescription-queries";

export type PrescriptionImagesPopupProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

function selectPrescription(prescription: PrescriptionCache) {
  return prescription.data.images;
}

export function PrescriptionImagesPopup(props: PrescriptionImagesPopupProps) {
  const { isMobile, prescriptionNo } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    data: prescriptionImage,
    isLoading,
    error,
  } = useGetPrescription({ prescriptionNo }, { select: selectPrescription });

  const newProps = {
    onOpen,
    isOpen,
    onClose,
    imageUrls: error ? [] : prescriptionImage ?? [],
  };

  if (isLoading) return <PrescriptionImagesPopupSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <PrescriptionImagesPopupMobile {...newProps} />;
  }
  return <PrescriptionImagesPopupDesktop {...newProps} />;
}

export type PrescriptionImagesPopupSkeletonProps = {
  isMobile?: boolean;
};

export function PrescriptionImagesPopupSkeleton(
  props: PrescriptionImagesPopupSkeletonProps
) {
  if (props.isMobile) return <PrescriptionImagesPopupSkeletonMobile />;
  return <PrescriptionImagesPopupSkeletonDesktop />;
}
