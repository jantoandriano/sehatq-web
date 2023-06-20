import { PaymentCheckoutVerifyResponse } from "../payment/payment-model";

type OptionItem = {
  id: number;
  name: string;
  adminFee: number;
  period?: number;
  unit?: string;
  amount?: number;
  slug?: string;
};

type PaymentOptionItem = {
  id: number;
  name: string;
  adminFee: number;
  imageUrl: string;
  disable: boolean;
  disabledReason: string;
};

export function getSummaryCC(
  orders: { data: PaymentCheckoutVerifyResponse } | undefined,
  installmentsOptions: OptionItem[] | undefined,
  typePayment: string
) {
  return {
    totalDeliveryFee: orders?.data.data.orderLog.totalDeliveryFee ?? 0,
    voucherValue: orders?.data.data.orderLog.voucherValue ?? 0,
    totalShippingInsurance:
      orders?.data.data.orderLog.totalShippingInsurance ?? 0,
    totalDonation: orders?.data.data.orderLog.totalDonation ?? 0,
    voucherType: orders?.data.data.orderLog.voucherType ?? "",
    totalProductInsurance:
      orders?.data.data.orderLog.totalProductInsurance ?? 0,
    totalSellingAmount: orders?.data.data.orderLog.totalSellingAmount ?? 0,
    adminFee:
      installmentsOptions && installmentsOptions.length > 0
        ? installmentsOptions
            ?.filter((item) => item.id === Number(typePayment))
            .map((j) => j.adminFee)
        : [],
  };
}

export function getQuery(
  orders: { data: PaymentCheckoutVerifyResponse } | undefined,
  paymentSlug: string
) {
  return {
    page: "",
    perPage: "",
    orderBy: "",
    sort: "",
    domain: orders?.data.data.orderLog.domain || "",
    productType: orders?.data.data.orderLog.productType || "",
    orderAmount: orders?.data.data.orderLog.grandTotal.toString() || "",
    slug: paymentSlug,
  };
}

export function adminFeePrimary(
  data: OptionItem[] | undefined,
  typePayment: string
) {
  if (data && data.length) {
    const fee = data?.find((item) => item.id === Number(typePayment));
    return fee?.adminFee;
  }
  return "0";
}

export function adminFeeSecondary(
  data: OptionItem[] | undefined,
  typePayment: string
) {
  if (data && data.length) {
    const fee = data?.find((item) => item.slug !== typePayment);
    return fee?.adminFee;
  }

  return "0";
}

export function getSummaryDetailOvo(
  orders: { data: PaymentCheckoutVerifyResponse } | undefined,
  paymentOptions: { options: PaymentOptionItem[] | undefined }[] | undefined,
  paymentId: string
) {
  return {
    totalDeliveryFee: orders?.data.data.orderLog.totalDeliveryFee ?? 0,
    voucherValue: orders?.data.data.orderLog.voucherValue ?? 0,
    totalShippingInsurance:
      orders?.data.data.orderLog.totalShippingInsurance ?? 0,
    totalDonation: orders?.data.data.orderLog.totalDonation ?? 0,
    voucherType: orders?.data.data.orderLog.voucherType ?? "",
    totalProductInsurance:
      orders?.data.data.orderLog.totalProductInsurance ?? 0,
    totalSellingAmount: orders?.data.data.orderLog.totalSellingAmount ?? 0,
    adminFee:
      paymentOptions && paymentOptions.length > 0
        ? paymentOptions[0].options
            ?.filter((item) => item.id === Number(paymentId))
            .map((j) => j.adminFee)
        : [],
  };
}
