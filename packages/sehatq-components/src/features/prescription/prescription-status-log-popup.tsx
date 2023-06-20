import React from "react";
import { useDisclosure } from "../../user-interfaces";
import {
  PrescriptionStatusLogPopupMobile,
  PrescriptionStatusLogPopupSkeletonMobile,
} from "./prescription-status-log-popup-mobile";
import {
  PrescriptionStatusLogPopupDesktop,
  PrescriptionStatusLogPopupSkeletonDesktop,
} from "./prescription-status-log-popup-desktop";
import {
  PrescriptionHistoryCache,
  useGetPrescriptionHistory,
} from "./prescription-history-queries";

export type PrescriptionStatusLogPopupProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

function selectPrescriptionHistory(
  prescriptionHistory: PrescriptionHistoryCache
) {
  return {
    id: prescriptionHistory.data.id,
    status: prescriptionHistory.data.status.id,
    histories: prescriptionHistory.data.histories,
  };
}

export function PrescriptionStatusLogPopup(
  props: PrescriptionStatusLogPopupProps
) {
  const { isMobile, prescriptionNo } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: prescriptionHistories, isLoading } = useGetPrescriptionHistory(
    { prescriptionNo },
    { select: selectPrescriptionHistory }
  );

  const newProps = {
    onOpen,
    isOpen,
    onClose,
    prescriptionHistories,
  };

  if (isLoading)
    return <PrescriptionStatusLogPopupSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <PrescriptionStatusLogPopupMobile {...newProps} />;
  }
  return <PrescriptionStatusLogPopupDesktop {...newProps} />;
}

export type PrescriptionStatusLogPopupSkeletonProps = {
  isMobile?: boolean;
};

export function PrescriptionStatusLogPopupSkeleton(
  props: PrescriptionStatusLogPopupSkeletonProps
) {
  if (props.isMobile) return <PrescriptionStatusLogPopupSkeletonMobile />;
  return <PrescriptionStatusLogPopupSkeletonDesktop />;
}
