import { DetailType, WaitingPaymentResponse } from "./waiting-payment-types";

export function mappingWaitingPayment(result: WaitingPaymentResponse | null) {
  if (result && result.data && result.data.detail.length) {
    return {
      serverTime: result.data.serverTime,
      status: result.data.status,
      callbackURL: result.data.callbackURL,
      backUrl: result.data.backUrl,
      paymentType:
        result.data.detail.length > 1
          ? result.data?.detail[1].paymentType
          : result.data?.detail[0].paymentType,
      paymentTimeout:
        result.data.detail.length > 1
          ? result.data.detail[1].paymentTimeout
          : result.data?.detail[0].paymentTimeout,
      detail: mappingDetail(result.data.detail),
      message: result?.meta?.message ?? "",
      coNumber:
        result.data.detail.length > 1
          ? result.data.detail[1].coNumber
          : result.data?.detail[0].coNumber,
    };
  }

  return {
    serverTime: "",
    paymentStatus: "",
    callbackURL: "",
    backUrl: "",
    paymentType: "",
    paymentTimeout: "",
    detail: [],
  };
}

function mappingDetail(details: DetailType[]) {
  return details.map((val) => ({
    coNumber: val.coNumber || "",
    paymentType: val.paymentType || "",
    paymentTimeout: val.paymentTimeout || "",
    transactionStatus: val.transactionStatus,
    vaNumbers: val.vaNumbers,
    maskedCard: val.maskedCard,
    permataVaNumber: val.permataVaNumber,
    currency: val.currency,
    billerCode: val.billerCode,
    billKey: val.billKey,
    grandTotal: val.grandTotal,
    name: val.name,
    iconUrl: val.iconUrl,
    qrCodeUrl: val.qrCodeUrl,
    deepLinkUrl: val.deepLinkUrl,
    transactionId: val.transactionId,
    transactionTime: val.transactionTime,
    status: val.status,
    paymentMethodId: val.paymentMethodId,
  }));
}

/**
 *  data to show on waiting-payment page
 *  check if single payment or split bill */
export function getDataWaitingPaymentStatus(data: any) {
  if (data && data.detail.length === 0) {
    return data;
  }
  if (data && data?.detail.length > 1) {
    return data?.detail[1];
  }
  if (data && data.detail.length <= 1) {
    return data?.detail[0];
  }
}
