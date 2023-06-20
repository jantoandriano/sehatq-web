import React from "react";
import { MyPrescriptionsMobile } from "./my-prescriptions-mobile";
import { MyPrescriptionsDesktop } from "./my-prescriptions-desktop";

export type MyPrescriptionsProps = { isMobile: boolean };

export function MyPrescriptions(props: MyPrescriptionsProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <MyPrescriptionsMobile />;
  }
  return <MyPrescriptionsDesktop />;
}
