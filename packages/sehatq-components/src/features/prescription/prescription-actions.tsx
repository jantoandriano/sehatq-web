import React from "react";
import { useNavigation } from "@sehatq/utils";
import { useDisclosure } from "../../user-interfaces";
import {
  useGetPrescription,
  useCreatePrescriptionCart,
  useRecreatePrescription,
} from "./prescription-queries";
import { PrescriptionActionsMobile } from "./prescription-actions-mobile";
import { PrescriptionActionsDesktop } from "./prescription-actions-desktop";

export type PrescriptionActionsProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

export function PrescriptionActions(props: PrescriptionActionsProps) {
  const { isMobile, prescriptionNo } = props;
  const { navigate } = useNavigation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: response } = useGetPrescription({ prescriptionNo });
  const createPrescriptionCartMutation = useCreatePrescriptionCart();
  const recreatePrescriptionMutation = useRecreatePrescription();

  function createPrescriptionCart() {
    if (response?.data.id) {
      createPrescriptionCartMutation.mutate(
        {
          prescriptionNo,
          prescriptionId: response?.data.id,
        },
        {
          onSuccess: () => {
            navigate("EXTERNAL_PRESCRIPTION_CART", { prescriptionNo });
          },
        }
      );
    }
  }

  function recreatePrescription() {
    recreatePrescriptionMutation.mutate({ prescriptionNo });
  }

  if (!response) {
    return null;
  }
  const { status, consultationInfo, doctorInfo } = response.data;

  if (
    status.id === "created" ||
    status.id === "approved" ||
    status.id === "expired" ||
    status.id === "request_expired" ||
    status.id === "rejected"
  ) {
    const newProps = {
      status: status.id,
      doctorSlug: doctorInfo?.slug ?? null,
      consultationId: consultationInfo?.id ?? null,
      channel: consultationInfo?.channel ?? null,
      createPrescriptionCart,
      isCreatingPrescriptionCart: createPrescriptionCartMutation.isLoading,
      recreatePrescription,
      onOpen,
      onClose,
      isOpen,
      isRecreatingPrescription: recreatePrescriptionMutation.isLoading,
    };
    if (isMobile) {
      return <PrescriptionActionsMobile {...newProps} />;
    }
    return <PrescriptionActionsDesktop {...newProps} />;
  }
  return null;
}
