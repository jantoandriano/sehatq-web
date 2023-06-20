import React from "react";
import { GeneralConsultationHCPInfoDesktop } from "./general-consultation-hcp-info-desktop";
import { GeneralConsultationHCPInfoMobile } from "./general-consultation-hcp-info-mobile";

export type GeneralConsultationHCPInfoProps = {
  isMobile?: boolean;
};

export function GeneralConsultationHCPInfo(
  props: GeneralConsultationHCPInfoProps
) {
  if (props.isMobile) return <GeneralConsultationHCPInfoMobile />;
  return <GeneralConsultationHCPInfoDesktop />;
}
