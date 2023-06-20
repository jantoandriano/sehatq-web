/* eslint-disable import/no-cycle */
import React from "react";
import { VirtualAccountMobile } from "./virtual-account-mobile";
import { VirtualAccountDesktop } from "./virtual-account-desktop";
import { DetailType } from "./waiting-payment-types";
import { trackingObjProps } from "./e-wallet";

export type VirtualAccountProps = {
  orderDetail: DetailType;
  isMobile: boolean;
  onConfirmPayment: (param?: boolean) => void;
  onCheckOrder: () => void;
  serverTime: string;
  status: string;
  trackingObj: trackingObjProps;
  onClickBack: () => void;
};

export function VirtualAccount(props: VirtualAccountProps) {
  if (props.isMobile) {
    return <VirtualAccountMobile {...props} />;
  }
  return <VirtualAccountDesktop {...props} />;
}
