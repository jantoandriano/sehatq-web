import { ENV } from "@constants";

type CalculateAdminFeeType = {
  totalDeliveryFee: number;
  totalShippingInsurance: number;
  totalProductInsurance: number;
  adminFee: number[] | undefined;
};

type CalculateSubtotalType = {
  totalSellingAmount: number;
  voucherValue: number;
  voucherType: string;
};

type CalculateGrandTotalType = {
  voucherValue: number;
  voucherType: string;
  totalDeliveryFee: number;
  totalShippingInsurance: number;
  totalProductInsurance: number;
  totalSellingAmount: number;
  totalDonation: number;
  adminCC?: number;
  adminFee: number[] | undefined;
  coveredValue?: number;
};

type PostMessageParamType = {
  eventType: string;
  state: string;
  status: string;
  message: string;
  coNumber: string;
  link: string;
};

export function calculateSubTotal(param: CalculateSubtotalType) {
  const { voucherValue, voucherType, totalSellingAmount } = param;
  const voucherAmount =
    voucherType.toLowerCase() !== "shipping" ? voucherValue : 0;
  return totalSellingAmount - voucherAmount;
}

export const calcAdminFee = (adminFee: number[] | undefined) => {
  return adminFee ? adminFee.reduce((fee, total) => fee + total, 0) : 0;
};

export function calculateGrandTotal(param: CalculateGrandTotalType) {
  const {
    voucherType,
    voucherValue,
    totalDeliveryFee,
    totalShippingInsurance,
    totalProductInsurance,
    totalDonation,
    adminCC = 0,
    adminFee,
    coveredValue = 0,
  } = param;
  const totalAdminFee = calcAdminFee(adminFee);
  const VoucherShippingValue =
    voucherType.toLowerCase() === "shipping" ? voucherValue : 0;
  const totalCalcValue = totalDeliveryFee - VoucherShippingValue - coveredValue;
  return (
    calculateSubTotal(param) +
    adminCC +
    totalAdminFee +
    totalCalcValue +
    totalShippingInsurance +
    totalProductInsurance +
    totalDonation
  );
}

export function postMessage(
  param: PostMessageParamType,
  url: string = ENV.PAYMENTQ_DOMAIN
) {
  window.parent.postMessage(param, url);
}

export function trackMobile(
  postData: PostMessageParamType,
  showToast?: (message: string, status: "success" | "error" | "netral") => void
) {
  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.actionEvent(JSON.stringify(postData));
  } else if (window.webkit && window.webkit.messageHandlers) {
    // Call iOS interface
    window.webkit.messageHandlers.actionEvent.postMessage(postData);
  } else {
    // Call Desktop Website interface
    postMessage(postData);
  }

  if (showToast) {
    showToast(
      postData.message || "",
      postData.state === "success" ? "success" : "error"
    );
  }
}

export const calculateAdminFee = (params: CalculateAdminFeeType) => {
  const {
    totalDeliveryFee,
    totalShippingInsurance,
    totalProductInsurance,
    adminFee,
  } = params;
  const totalAdminFee = calcAdminFee(adminFee);
  return (
    totalDeliveryFee +
    totalShippingInsurance +
    totalProductInsurance +
    totalAdminFee
  );
};
