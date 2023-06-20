import { useGetPaymentCheckoutVerify } from "@components/features";
import { useContextCheckLimit } from "src/contexts/check-limit";
import { useContextSelectedPayment } from "src/contexts/selected-payment";
import { calculateGrandTotal } from "src/utils";

export function useGetQueryInstallments({ token, stateForm }: any) {
  const checkLimitCtx = useContextCheckLimit();
  const selectedPaymentCtx = useContextSelectedPayment();

  const { data: orders } = useGetPaymentCheckoutVerify({
    token,
  });

  function generateQueryInstallments() {
    if (selectedPaymentCtx?.selectedPayment.length > 1) {
      return getQueryInstallmentsSplitBill();
    }
    return getQueryInstallmentsReguler();
  }

  function getQueryInstallmentsReguler() {
    const binCode = stateForm.values.cardNumber.slice(0, 6);

    const orderAmount = calculateGrandTotal({
      totalDeliveryFee: orders?.data.data.orderLog.totalDeliveryFee || 0,
      voucherValue: orders?.data.data.orderLog.voucherValue || 0,
      totalShippingInsurance:
        orders?.data.data.orderLog.totalShippingInsurance || 0,
      totalDonation: orders?.data.data.orderLog.totalDonation || 0,
      voucherType: String(orders?.data.data.orderLog.voucherType),
      totalProductInsurance:
        orders?.data.data.orderLog.totalProductInsurance || 0,
      totalSellingAmount: orders?.data.data.orderLog.totalSellingAmount || 0,
      adminFee: [],
    });

    return {
      page: "1",
      perPage: "10",
      binCode,
      orderAmount: orderAmount.toString() || "",
    };
  }

  function getQueryInstallmentsSplitBill() {
    const binCode = stateForm.values.cardNumber.slice(0, 6);
    const orderAmount = checkLimitCtx?.stateCheckLimit?.excessWithAdminFee || 0;

    return {
      page: "1",
      perPage: "10",
      binCode,
      orderAmount: orderAmount.toString(),
    };
  }

  return {
    generateQueryInstallments,
  };
}
