import React from "react";
import {
  MessageDeliveryReceiptDesktop,
  MessageDeliveryReceiptDesktopProps,
} from "./message-delivery-receipt-desktop";
import {
  MessageDeliveryReceiptMobile,
  MessageDeliveryReceiptMobileProps,
} from "./message-delivery-receipt-mobile";

export type MessageDeliveryReceiptProps =
  | ({ isMobile: true } & MessageDeliveryReceiptMobileProps)
  | ({ isMobile: false } & MessageDeliveryReceiptDesktopProps);

export function MessageDeliveryReceipt(props: MessageDeliveryReceiptProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <MessageDeliveryReceiptMobile {...otherProps} />;
  }
  return <MessageDeliveryReceiptDesktop {...otherProps} />;
}
