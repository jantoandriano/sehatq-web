import { Dispatch, SetStateAction } from "react";
import { PaymentCheckoutVerifyCache } from "../payment";
import { trackingObjProps } from "./charge-page-types";
import { IFieldUnion, IFields } from "./credit-card-reducer";

export type CreditCardPageProps = {
  isMobile: boolean;
  verifyToken: PaymentCheckoutVerifyCache | undefined;
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

export type StatePaymentType = {
  isConfrim: boolean;
  isExpired: boolean;
};

export type OrderSummary = {
  totalDeliveryFee: number;
  voucherValue: number;
  totalShippingInsurance: number;
  totalDonation: number;
  voucherType: string;
  totalProductInsurance: number;
  totalSellingAmount: number;
  adminFee: number[] | undefined;
  subTotal: string | number | undefined;
  grandTotal: string | number | undefined;
  coNumber: string;
  isCashless?: boolean;
  paymentMethodPrimary?: string;
  paymentMethodSecondary?: string;
  coveredValue?: string | number;
  domain: string;
  totalAdminFee: string | number;
  discount: string | number;
  voucherCode: string;
  productType: string;
};

export type InstallmentsOptions = {
  adminFee: number;
  id: number;
  name: string;
  period: number;
  unit: string;
  amount: number;
};

export type SummaryOrderProps = {
  isMobile?: boolean;
  summaryDetail: OrderSummary;
};

export type CreditCardProps = {
  onOpenModal: any;
  isOpenModal: boolean;
  data: OrderSummary;
  form: CreditCardFormProps;
};

export type CreditCardFormProps = {
  isMobile?: boolean;
  showCVV: boolean;
  onShowCVV: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: IFieldUnion) => void;
  values: IFields;
  errors?: Record<string, string | undefined>;
  onChangeExpiredDate: (params: string) => void;
  onChangeChoosePurchase: (params: string) => void;
  iframeUrl: string;
  openCVVInfo: boolean;
  onToogleCvvInfo: () => void;
  isLoading3ds: boolean;
  installmentsOptions?: InstallmentsOptions[];
  setStatePayment: Dispatch<SetStateAction<StatePaymentType>>;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onArrowBack: any;
};

export type ModalSummaryOrders = {
  summaryDetail: OrderSummary;
  isMobile?: boolean;
  onOpenModal: any;
  isOpenModal: boolean;
};
