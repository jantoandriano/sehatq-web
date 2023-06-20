import React, { useState, useEffect } from "react";
import { useNavigation } from "@sehatq/utils";
import {
  PrescriptionCache,
  useGetPrescription,
} from "../telemedicine/prescription-queries";
import { GoToPrescriptionDetailMobile } from "./go-to-prescription-detail-mobile";
import { GoToPrescriptionDetailDesktop } from "./go-to-prescription-detail-desktop";

export type GoToPrescriptionDetailProps = {
  isMobile?: boolean;
  consultationId: string;
};

function selectPrescriptionNo(prescription: PrescriptionCache) {
  return prescription.prescriptionNo;
}

export function GoToPrescriptionDetail(props: GoToPrescriptionDetailProps) {
  const { isMobile, consultationId } = props;
  const { navigate } = useNavigation();
  const [enabled, setEnabled] = useState(false);

  const { data: prescriptionNo, isLoading } = useGetPrescription(
    { consultationId },
    { select: selectPrescriptionNo, enabled }
  );

  useEffect(() => {
    if (prescriptionNo && enabled) {
      navigate("PRESCRIPTION", {
        prescriptionNo,
      });
    }
  }, [prescriptionNo, enabled, navigate]);

  function onClickPrescriptionDetail() {
    setEnabled(true);
  }

  const newProps = {
    isLoading,
    onClickPrescriptionDetail,
  };

  if (isMobile) {
    return <GoToPrescriptionDetailMobile {...newProps} />;
  }
  return <GoToPrescriptionDetailDesktop {...newProps} />;
}
