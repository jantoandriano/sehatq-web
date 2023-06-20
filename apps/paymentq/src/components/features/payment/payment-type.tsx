export type PaymentCheckLimitType = {
  imageUrl?: string;
  name: string;
  covered: number;
  remainingLimit: number;
  excess: number;
  excessWithAdminFee: number;
};

export const DataPaymentLimit = {
  imageUrl: "",
  name: "",
  covered: 0,
  remainingLimit: 0,
  excess: 0,
  excessWithAdminFee: 0,
};

export type ModalCheckLimitType = {
  imageUrl?: string;
  message: string;
};

export const DataModalCheckLimit = {
  imageUrl: "",
  message: "",
};

export type OrderDetailProps = {
  isCashless: boolean;
  totalDeliveryFee: number;
  voucherValue: number;
  totalShippingInsurance: number;
  totalDonation: number;
  voucherType: string;
  totalProductInsurance: number;
  totalSellingAmount: number;
  grandTotal: number;
  adminFee: number;
  onPurchase: () => void;
  isLoadingPurchase: boolean;
  isDisableButonPurchase: boolean;
  paymentCheckLimit: PaymentCheckLimitType;
  selllingAmountWording: string;
  voucherCode: string;
};
