import { useGetPaymentCheckoutVerify } from "@components/features";
import { calculateGrandTotal, calculateSubTotal } from "@utils";
import { useContextCheckLimit } from "src/contexts/check-limit";
import { useContextSelectedPayment } from "src/contexts/selected-payment";

type PropsType = {
  token: string;
  paymentOptions: any;
};

export const useOrdersSummaryOvo = (props: PropsType) => {
  const { token, paymentOptions } = props;

  const { data: orders } = useGetPaymentCheckoutVerify({
    token,
  });

  const selectedPaymentCtx = useContextSelectedPayment();
  const checkLimitCtx = useContextCheckLimit();

  const TYPE_PAYMENT = "split-bill";

  const feeSplitBill = getFeeSplitBill({
    orders,
    selectedPayment: selectedPaymentCtx?.selectedPayment,
    paymentCheckLimit: checkLimitCtx?.stateCheckLimit,
  });

  const feeReguler = getFeeReguler({ orders, paymentOptions });

  const fee =
    selectedPaymentCtx?.selectedPayment &&
    selectedPaymentCtx.selectedPayment.length > 1
      ? { ...feeSplitBill }
      : { ...feeReguler };

  function adminFeePrimary(data: { slug: string; adminFee: number }[]) {
    const fee = data.find((item) => item.slug === TYPE_PAYMENT);
    return fee ? fee.adminFee : 0;
  }

  function adminFeeSecondary(data: { slug: string; adminFee: number }[]) {
    const fee = data.find((item) => item.slug !== TYPE_PAYMENT);
    return fee ? fee.adminFee : 0;
  }

  const ordersSumary = {
    ...fee,
    isCashless:
      selectedPaymentCtx?.selectedPayment &&
      !!selectedPaymentCtx.selectedPayment.find(
        (item: any) => item.slug === TYPE_PAYMENT
      ),
    subTotal: calculateSubTotal(fee),
    grandTotal: calculateGrandTotal(fee),
    coNumber: orders?.data.data.coNumber as string,
    paymentMethodPrimary:
      selectedPaymentCtx?.selectedPayment.length > 1
        ? selectedPaymentCtx?.selectedPayment[0].name
        : "",
    paymentMethodSecondary:
      selectedPaymentCtx?.selectedPayment.length > 1
        ? selectedPaymentCtx?.selectedPayment[1].name
        : selectedPaymentCtx?.selectedPayment[0].name,
    domain: orders?.data.data.orderLog.domain || "",
    totalAdminFee:
      adminFeePrimary(selectedPaymentCtx?.selectedPayment) +
      adminFeeSecondary(selectedPaymentCtx?.selectedPayment),
    discount: orders?.data.data.orderLog.totalDiscountAmount || "",
    voucherCode: orders?.data.data.orderLog.voucherCode || "",
  };

  return {
    ordersSumary,
  };
};

function getFeeReguler({ orders, paymentOptions }: any) {
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
        ? paymentOptions.map((j: any) => j.adminFee)
        : [],
    productType: orders?.data.data.orderLog.productType || "",
  };
}

function getFeeSplitBill({ orders, selectedPayment, paymentCheckLimit }: any) {
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
      selectedPayment && selectedPayment.map((item: any) => item.adminFee),
    coveredValue: paymentCheckLimit?.covered ?? 0,
    productType: orders?.data.data.orderLog.productType || "",
  };
}
