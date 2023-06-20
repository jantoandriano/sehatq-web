import React from "react";
import { OvoFormChargeMobile } from "./ovo-form-charge-mobile";
import { OvoFormChargeDesktop } from "./ovo-form-charge-desktop";

export type OvoFormChargeProps = {
  isMobile?: boolean;
  totalProductPrice: string;
  total: string;
};

export function OvoFormCharge(props: OvoFormChargeProps) {
  if (props.isMobile) {
    return <OvoFormChargeMobile {...props} />;
  }
  return <OvoFormChargeDesktop {...props} />;
}
