import React from "react";
import { VirtualAccountMobile } from "./virtual-account-mobile";
import { VirtualAccountDesktop } from "./virtual-account-desktop";

type PaymentGuidanceType = {
  id: string;
  title: string;
  description: string;
};

type OrderDetailType = {
  coNumber: string;
  paymentTimeout: string;
  paymentType: string;
  grandTotal: string;
  vaNumbers: string;
  currency: string;
};

export type VirtualAccountProps = {
  paymentGuidances: PaymentGuidanceType[];
  orderDetail: OrderDetailType;
  isMobile?: boolean;
};

export function VirtualAccount(props: VirtualAccountProps) {
  if (props.isMobile) {
    return <VirtualAccountMobile {...props} />;
  }
  return <VirtualAccountDesktop {...props} />;
}
