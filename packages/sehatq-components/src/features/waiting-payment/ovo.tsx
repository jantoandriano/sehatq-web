import React from "react";
import { OvoPageMobile } from "./ovo-mobile";
import { OvoPageDesktop } from "./ovo-desktop";

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

export type OvoPageProps = {
  paymentGuidances: PaymentGuidanceType[];
  orderDetail: OrderDetailType;
  isMobile?: boolean;
};

export function OvoPage(props: OvoPageProps) {
  if (props.isMobile) {
    return <OvoPageMobile {...props} />;
  }

  return <OvoPageDesktop {...props} />;
}
