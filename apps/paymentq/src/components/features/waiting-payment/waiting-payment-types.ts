export type WaitingPaymentDataType = {
  coNumber: string;
  transactionTime: string;
  paymentType: string;
  grandTotal: string;
  vaNumbers: string;
  currency: string;
  paymentName: string;
  paymentIcon: string;
  paymentMethodId: string;
  deepLinkUrl: string;
  serverTime: string;
  paymentStatus: string;
  qrCodeUrl: string;
  callbackURL: string;
  metaMessage: string;
  backURL?: string;
  paymentTimeout: string;
};

export type DetailType = {
  coNumber: string;
  paymentType: string;
  paymentTimeout: string;
  transactionStatus: string;
  vaNumbers: string;
  maskedCard: string;
  permataVaNumber: string;
  currency: string;
  billerCode: string;
  billKey: string;
  grandTotal: number | string;
  name: string;
  iconUrl: string;
  qrCodeUrl: string;
  deepLinkUrl: string;
  transactionId: string;
  transactionTime: string;
  status: string;
  paymentMethodId: number | string;
  isLoading?: boolean | undefined;
  error?: string | undefined;
};

export type Data = {
  status: string;
  serverTime: string;
  callbackURL: string;
  backUrl: string;
  detail: DetailType[];
  paymentType: string;
  paymentTimeout: string;
  coNumber: string;
  message: string;
};

export type Error = {
  clientId: string;
  message: string;
  status?: number | null;
  url?: string;
};

export type WaitingPaymentResponse = {
  code: string;
  meta: {
    message: string;
  };
  data: Data;
};

export type OrderDetailType = {
  data: {
    coNumber: string;
    transactionTime: string;
    paymentType: string;
    grandTotal: string;
    vaNumbers: string;
    currency: string;
    paymentName: string;
    paymentIcon: string;
    paymentMethodId: string;
    deepLinkUrl: string;
    serverTime: string;
    paymentStatus: string;
    qrCodeUrl: string;
    callbackURL: string;
    paymentTimeout: string;
  };
  error: string | null;
  isLoading: boolean;
};
