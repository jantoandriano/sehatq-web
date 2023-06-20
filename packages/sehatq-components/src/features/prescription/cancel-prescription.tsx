import React from "react";
import { useDisclosure } from "../../user-interfaces";
import { CancelPrescriptionMobile } from "./cancel-prescription-mobile";
import { CancelPrescriptionDesktop } from "./cancel-prescription-desktop";
import {
  useCancelPrescription,
  useGetPrescription,
  PrescriptionCache,
} from "./prescription-queries";

export type CancelPrescriptionProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

function selectPrescriptionId(cache: PrescriptionCache) {
  return cache.data.id;
}

export function CancelPrescription(props: CancelPrescriptionProps) {
  const { isMobile, prescriptionNo } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: prescriptionId, refetch } = useGetPrescription(
    { prescriptionNo },
    { select: selectPrescriptionId }
  );
  const { mutate, isLoading } = useCancelPrescription();

  function onHandleCancelPrescription() {
    if (prescriptionId) {
      mutate(
        { prescriptionNo, prescriptionId },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  }

  const newProps = {
    onOpen,
    isOpen,
    onClose,
    isLoading,
    onHandleCancelPrescription,
    number: prescriptionNo,
  };

  if (isMobile) {
    return <CancelPrescriptionMobile {...newProps} />;
  }
  return <CancelPrescriptionDesktop {...newProps} />;
}
