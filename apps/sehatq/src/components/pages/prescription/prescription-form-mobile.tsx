import React from "react";
import { PrescriptionForm } from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { PrescriptionFormHead } from "@components/head";
import { PrescriptionFormGeneralProps } from "./prescription-form-desktop";

export function PrescriptionFormMobile(props: PrescriptionFormGeneralProps) {
  return (
    <>
      <PrescriptionFormHead />
      <SehatQHeader variant="text" text="Upload Resep" />
      <PrescriptionForm consultationId={props.consultationId} isMobile />
    </>
  );
}
