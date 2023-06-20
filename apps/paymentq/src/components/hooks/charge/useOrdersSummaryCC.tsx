import { useGetPaymentCheckoutVerify } from "@components/features";
import {
  InstallmentsCache,
  useGetInstallments,
} from "@components/features/charge/installments-queries";
import { useContextCheckLimit } from "src/contexts/check-limit";
import { useContextSelectedPayment } from "src/contexts/selected-payment";
import { calculateGrandTotal, calculateSubTotal } from "src/utils";
import { useGetQueryInstallments } from "./useGetQueryInstallments";

function selectInstallments(data: InstallmentsCache) {
  return data.data.data.map((item) => ({
    options: item.options.map((option) => ({
      id: option.InstallmentId,
      name: item.bankName,
      adminFee: option.adminFee,
      period: option.installmentPeriod,
      unit: option.installmentPeriodUnit,
      amount: option.installmentAmount,
    })),
  }));
}

export function useOrderSummaryCC({ token, stateForm }: any) {
  const { data: orders } = useGetPaymentCheckoutVerify({
    token,
  });

  const { generateQueryInstallments } = useGetQueryInstallments({
    token,
    stateForm,
  });

  const { data: installmentsOptions } = useGetInstallments(
    generateQueryInstallments(),
    {
      enabled: stateForm.values.cardNumber.length >= 6,
      select: selectInstallments,
      keepPreviousData: stateForm.values.cardNumber.length >= 6,
    }
  );

  const checkLimitCtx = useContextCheckLimit();
  const selectedPaymentCtx = useContextSelectedPayment();
  const selectedInstallments = installmentsOptions
    ? installmentsOptions[0].options.filter(
        (val) => val.id === Number(stateForm.values.purchase)
      )
    : [{ adminFee: 0 }];
  const temp = selectedPaymentCtx?.selectedPayment.concat(selectedInstallments);

  const feeSplitBill = getFeeSplitBill({
    orders,
    selectedPayment: temp,
    paymentCheckLimit: checkLimitCtx?.stateCheckLimit,
  });

  const feeReguler = getFeeReguler({
    orders,
    installmentsOptions: selectedInstallments,
  });

  const fee =
    selectedPaymentCtx?.selectedPayment.length > 1
      ? { ...feeSplitBill }
      : { ...feeReguler };

  function adminFeePrimary() {
    if (selectedPaymentCtx && selectedPaymentCtx?.selectedPayment.length > 1) {
      const temp = selectedPaymentCtx?.selectedPayment.find(
        (val: any) => val.slug.toLowerCase() === "split-bill"
      );
      return temp?.adminFee ?? 0;
    }

    return 0;
  }

  function adminFeeSecondary() {
    if (selectedInstallments?.length) {
      const temp = selectedInstallments.find((val) => val.adminFee);
      return temp?.adminFee ?? 0;
    }

    return 0;
  }

  const ordersSummaryCC = {
    ...fee,
    subTotal: calculateSubTotal(fee),
    grandTotal: calculateGrandTotal(fee),
    coNumber: orders?.data?.data?.coNumber || "",
    isCashless: !!selectedPaymentCtx?.selectedPayment.find(
      (item: any) => item.slug === "split-bill"
    ),
    paymentMethodPrimary:
      selectedPaymentCtx?.selectedPayment.length > 1
        ? selectedPaymentCtx?.selectedPayment[0].name
        : "",
    paymentMethodSecondary:
      selectedPaymentCtx?.selectedPayment.length > 1
        ? selectedPaymentCtx?.selectedPayment[1].name
        : selectedPaymentCtx?.selectedPayment[0].name,
    paymentCheckLimit: checkLimitCtx?.stateCheckLimit,
    domain: orders?.data.data.orderLog.domain || "",
    totalAdminFee: adminFeePrimary() + adminFeeSecondary(),
    discount: orders?.data.data.orderLog.totalDiscountAmount || "",
    voucherCode: orders?.data.data.orderLog.voucherCode || "",
  };

  return {
    ordersSummaryCC,
  };
}

function getFeeReguler({ orders, installmentsOptions }: any) {
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
        ? installmentsOptions.map((j: any) => j.adminFee)
        : [0],
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
      selectedPayment && selectedPayment.length > 1
        ? selectedPayment.map((j: any) => j.adminFee)
        : [0],
    coveredValue: paymentCheckLimit?.covered ?? 0,
    productType: orders?.data.data.orderLog.productType || "",
  };
}
