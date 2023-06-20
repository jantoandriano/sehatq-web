import { Dispatch, SetStateAction } from "react";
import { type StatePaymentType } from "../payment/payment";
import { PaymentCheckoutVerifyCache } from "../payment/payment-queries";
import { OrderSummary } from "./credit-card-types";
import { trackingObjProps } from "./charge-page-types";

export type OvoFormChargeProps = {
  verifyToken: PaymentCheckoutVerifyCache | undefined;
  isMobile?: boolean;
  ovoLastPhoneNumber: string | undefined;
  trackingObj: trackingObjProps;
  failedAndCancelHandler: (
    backURL: string,
    status: string,
    coNumber?: string
  ) => void;
  stateBackButtonBrowser: boolean;
  onCloseModalBackBrowser: () => void;
  setBackButtonBrowser: any;
};

export type OvoFormChargeDesktopProps = {
  summaryOrders: OrderSummary;
  phoneNumber: string | undefined;
  onPurchase: () => void;
  onChangePhoneNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoadingPurchase: boolean;
  statePayment: StatePaymentType;
  setStatePayment: Dispatch<SetStateAction<StatePaymentType>>;
  phoneNumberError: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export type OvoFormChargeMobileProps = {
  summaryOrders: OrderSummary;
  phoneNumber: string | undefined;
  onPurchase: () => void;
  onChangePhoneNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoadingPurchase: boolean;
  statePayment: StatePaymentType;
  setStatePayment: Dispatch<SetStateAction<StatePaymentType>>;
  phoneNumberError: string;
  isOpenModalOrder: boolean;
  onOpenOrderSummary: () => void;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
