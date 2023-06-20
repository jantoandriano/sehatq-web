import React from "react";
import { SummaryOrderDesktop } from "./summary-order-desktop";
import { SummaryOrderMobile } from "./summary-order-mobile";
import { type SummaryOrderProps } from "./credit-card-types";

export function SummaryOrder(props: SummaryOrderProps) {
  if (props.isMobile) {
    return <SummaryOrderMobile {...props} />;
  }

  return <SummaryOrderDesktop {...props} />;
}
