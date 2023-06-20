import React from "react";
import { EmptyMyPrescriptionsMobile } from "./empty-my-prescriptions-mobile";
import { EmptyMyPrescriptionsDesktop } from "./empty-my-prescriptions-desktop";

export type EmptyMyPrescriptionsProps = {
  isMobile?: boolean;
};

export function EmptyMyPrescriptions(props: EmptyMyPrescriptionsProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <EmptyMyPrescriptionsMobile />;
  }
  return <EmptyMyPrescriptionsDesktop />;
}
