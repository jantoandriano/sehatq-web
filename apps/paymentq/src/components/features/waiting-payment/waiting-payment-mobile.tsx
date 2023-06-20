import React from "react";
import { PAYMENT_TYPES } from "src/constants";
import { ModalConfirm } from "../payment/modal-confirm";
import { EWallet } from "./e-wallet";
import { OvoPage } from "./ovo";
import { VirtualAccount } from "./virtual-account";
import { DetailType } from "./waiting-payment-types";
import { CreditCard } from "./credit-card";

type TrackingObjProps = {
  eventType: string;
  state: string;
  status: string;
  message: string;
  coNumber: string;
  link: string;
};

type WaitingPaymentMobileType = {
  paymentType: string | undefined;
  stateModal: {
    isVisible: boolean;
    title: string;
    message: string;
  };
  orderDetail: DetailType;
  isMobile: boolean;
  onConfirmPayment: (param?: boolean) => void;
  onCheckOrder: () => void;
  serverTime: string;
  status: string;
  trackingObj: TrackingObjProps;
  isLoadingWaitingPaymentStatus: boolean;
  modalConfirmCC: boolean;
  onCancelCreditCard: () => void;
  onClickBack: () => void;
};

export function WaitingPaymentMobile(props: WaitingPaymentMobileType) {
  const {
    paymentType,
    stateModal,
    onConfirmPayment,
    isLoadingWaitingPaymentStatus,
    modalConfirmCC,
  } = props;

  const isVirtualAccount =
    paymentType === PAYMENT_TYPES.BANK_BNI ||
    paymentType === PAYMENT_TYPES.BANK_BCA ||
    paymentType === PAYMENT_TYPES.BANK_MANDIRI ||
    paymentType === PAYMENT_TYPES.BANK_PERMATA;

  const isEwallet =
    paymentType === PAYMENT_TYPES.GOPAY ||
    paymentType === PAYMENT_TYPES.SHOPEEPAY;

  const isOvo = paymentType === PAYMENT_TYPES.OVO;

  const isCreditCard =
    paymentType === PAYMENT_TYPES.CREDIT_CARD && modalConfirmCC;
  return (
    <>
      {isVirtualAccount ? <VirtualAccount {...props} /> : null}

      {isEwallet ? <EWallet {...props} /> : null}

      {isOvo ? <OvoPage {...props} /> : null}

      {isCreditCard ? <CreditCard {...props} /> : null}

      <ModalConfirm
        isOpen={stateModal.isVisible}
        title={stateModal.title}
        message={stateModal.message}
        onCancel={onConfirmPayment}
        cancelText="OK"
        isLoading={isLoadingWaitingPaymentStatus}
      />
    </>
  );
}
