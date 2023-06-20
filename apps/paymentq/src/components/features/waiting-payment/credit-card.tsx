import React from "react";
import { CreditCardMobile } from "./credit-card-mobile";
import { CreditCardDesktop } from "./credit-card-desktop";
import { WaitingPaymentSkeleton } from "./waiting-payment-skeleton";

export type CreditCardProps = {
  isMobile: boolean;
  modalConfirmCC: boolean;
  onCancelCreditCard: () => void;
};

export function CreditCard(props: CreditCardProps) {
  const { isMobile } = props;
  if (isMobile) {
    return (
      <>
        <WaitingPaymentSkeleton isMobile={isMobile} />
        <CreditCardMobile {...props} />;
      </>
    );
  }

  return (
    <>
      <WaitingPaymentSkeleton isMobile={isMobile} />
      <CreditCardDesktop {...props} />;
    </>
  );
}
