import { useRouter } from "next/router";
import React from "react";
import { PrescriptionFormDesktop } from "./prescription-form-desktop";
import { PrescriptionFormMobile } from "./prescription-form-mobile";

export type PrescriptionFormProps = {
  isMobile?: boolean;
};

export function PrescriptionForm(props: PrescriptionFormProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { consultationId } = router.query;

  const otherProps = {
    consultationId: consultationId ? `${consultationId}` : undefined,
  };

  if (isMobile) {
    return <PrescriptionFormMobile {...otherProps} />;
  }
  return <PrescriptionFormDesktop {...otherProps} />;
}
