import React, { useEffect, useState } from "react";
import { useNavigation } from "@sehatq/utils";
import { EndConsultationPopupDesktop } from "./end-consultation-popup-desktop";
import { EndConsultationPopupMobile } from "./end-consultation-popup-mobile";
import {
  useUpdateConsultation,
  useGetConsultation,
  ConsultationCache,
} from "./consultation-queries";
import { useGetPrescription } from "./prescription-queries";

export type EndConsultationPopupProps = {
  isMobile?: boolean;
  consultationId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  goToRatingForm: () => void;
  goToBuyPrescription: () => void;
};

function selectConsultation(consultation: ConsultationCache) {
  return consultation.data;
}

export function EndConsultationPopup(props: EndConsultationPopupProps) {
  const { isMobile, consultationId, onSuccess, ...otherProps } = props;
  const { navigate } = useNavigation();
  const [enabled, setEnabled] = useState(false);
  const { data: consultation } = useGetConsultation(
    { consultationId },
    { select: selectConsultation }
  );
  const { data: prescription, isLoading } = useGetPrescription(
    {
      consultationId,
    },
    { enabled }
  );
  const {
    mutate: updateConsultation,
    isLoading: isUpdating,
    isSuccess,
  } = useUpdateConsultation();

  useEffect(() => {
    if (prescription && enabled) {
      navigate("PRESCRIPTION", {
        prescriptionNo: prescription.prescriptionNo,
      });
    }
  }, [prescription, enabled, navigate]);

  function closeConsultationChat() {
    updateConsultation(
      {
        consultationId,
        status: "closed",
      },
      {
        onSuccess,
      }
    );
  }

  function goToTelemedLanding() {
    navigate("TELEMEDICINES");
  }

  function onClickPrescriptionDetail() {
    setEnabled(true);
  }

  const newProps = {
    isUpdating,
    consultationId,
    goToTelemedLanding,
    closeConsultationChat,
    showPrescriptionButton: Boolean(consultation?.recommendation),
    isSuccess: isSuccess || consultation?.status === "closed",
    onClickPrescriptionDetail,
    isLoading,
    ...otherProps,
  };

  if (isMobile) {
    return <EndConsultationPopupMobile {...newProps} />;
  }
  return <EndConsultationPopupDesktop {...newProps} />;
}
