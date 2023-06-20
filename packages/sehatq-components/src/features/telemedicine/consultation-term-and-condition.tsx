import React from "react";
import { ConsultationTermAndConditionDesktop } from "./consultation-term-and-condition-desktop";
import { ConsultationTermAndConditionMobile } from "./consultation-term-and-condition-mobile";

export type ConsultationTermAndConditionProps = {
  isMobile?: boolean;
};

export function ConsultationTermAndCondition(
  props: ConsultationTermAndConditionProps
) {
  if (props.isMobile) {
    return <ConsultationTermAndConditionMobile />;
  }

  return <ConsultationTermAndConditionDesktop />;
}
