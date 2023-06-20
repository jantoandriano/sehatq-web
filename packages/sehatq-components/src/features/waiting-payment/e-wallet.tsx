import React from "react";
import { EWalletMobile } from "./e-wallet-mobile";
import { EWalletDesktop } from "./e-wallet-desktop";

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

export type EWalletProps = {
  paymentGuidances: PaymentGuidanceType[];
  orderDetail: OrderDetailType;
  isMobile?: boolean;
};

export function EWallet(props: EWalletProps) {
  if (props.isMobile) {
    return <EWalletMobile {...props} />;
  }

  return <EWalletDesktop {...props} />;
}
