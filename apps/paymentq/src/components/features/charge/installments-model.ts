import { calculateGrandTotal } from "src/utils";
import { PaymentCheckoutVerifyResponse } from "../payment/payment-model";

export interface InstallmentsResponse {
  code: number;
  meta: {
    pagination: {
      page: number;
      perPage: number;
      maxPage: number;
      total: number;
    };
    message: string;
  };
  data: InstallmentData[];
}

export type InstallmentData = {
  id: number;
  bank_id: number;
  installment_period: number;
  installment_period_unit: string;
  installment_fee: number;
  installment_fee_unit: string;
  min_payment: number;
  bankName: string;
  bankAbbv: string;
  options: {
    InstallmentId: number;
    installmentPeriod: number;
    installmentPeriodUnit: string;
    installmentAmount: number;
    adminFee: number;
  }[];
};

export function modelInstallments(data: InstallmentsResponse) {
  return data;
}

export function getQueryInstallmentsReguler(
  orders: { data: PaymentCheckoutVerifyResponse } | undefined,
  cardNumber: string
) {
  const binCode = cardNumber.slice(0, 6);

  const orderAmount = calculateGrandTotal({
    totalDeliveryFee: orders?.data.data.orderLog.totalDeliveryFee ?? 0,
    voucherValue: orders?.data.data.orderLog.voucherValue ?? 0,
    totalShippingInsurance:
      orders?.data.data.orderLog.totalShippingInsurance ?? 0,
    totalDonation: orders?.data.data.orderLog.totalDonation ?? 0,
    voucherType: orders?.data.data.orderLog.voucherType ?? "",
    totalProductInsurance:
      orders?.data.data.orderLog.totalProductInsurance ?? 0,
    totalSellingAmount: orders?.data.data.orderLog.totalSellingAmount ?? 0,
    adminFee: [],
  });

  return {
    page: "1",
    perPage: "10",
    binCode,
    orderAmount: orderAmount.toString() || "",
  };
}
