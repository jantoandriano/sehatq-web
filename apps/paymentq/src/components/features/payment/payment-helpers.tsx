import React from "react";
import { ToastArgs } from "@sehatq/components/src/user-interfaces/use-toast";
import { priceFormat } from "@sehatq/utils";
import { Text, Flex, VStack, Divider } from "@sehatq/components";
import {
  PaymentCheckLimitType,
  ModalCheckLimitType,
  OrderDetailProps,
} from "./payment-type";
import { PaymentCheckoutVerifyResponse } from "./payment-model";
import { type StateSelectPaymentType } from "./payment";

export const handleErrorMessage = (message: string) => {
  const seperateMsg = message.split("|");
  return {
    title: message.includes("|") ? seperateMsg[0] : "",
    message: message.includes("|") ? seperateMsg[1] : message,
    status: "error",
  } as ToastArgs;
};

export const amountPurchaseValue = (
  data: { slug: string; adminFee: number },
  grandTotal: number,
  paymentCheckLimit: PaymentCheckLimitType,
  typePayment: string
) => {
  return data.slug === typePayment
    ? paymentCheckLimit?.covered
    : paymentCheckLimit?.name !== ""
    ? paymentCheckLimit?.excess
    : grandTotal - data.adminFee;
};

export const generateModalInfo = (paymentCheckLimit: ModalCheckLimitType) => {
  const messageSplit = paymentCheckLimit.message
    ? paymentCheckLimit.message.split(" | ")
    : "";
  return {
    image: paymentCheckLimit?.imageUrl,
    title: messageSplit[0] || "",
    description: messageSplit[1] || "",
    btnText: "Pilih Metode Pembayaran Lain",
  };
};

export function renderFieldFee(
  label: string,
  value: string | number,
  isNegativeValue = false
) {
  return (
    <Flex w="full" justifyContent="space-between">
      <Text
        fontSize="xs"
        maxWidth="60%"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        title={label}
      >
        {label}
      </Text>
      <Text
        fontSize="xs"
        fontWeight="semibold"
        color={isNegativeValue ? "cherry.300" : ""}
      >
        {value}
      </Text>
    </Flex>
  );
}

export const renderOrderSummary = (props: OrderDetailProps) => {
  const {
    totalSellingAmount,
    totalDonation,
    voucherValue,
    adminFee,
    totalDeliveryFee,
    totalShippingInsurance,
    totalProductInsurance,
    paymentCheckLimit,
    selllingAmountWording,
    voucherCode,
  } = props;
  return (
    <VStack align="flex-start" spacing={2}>
      {totalSellingAmount > 0
        ? renderFieldFee(selllingAmountWording, priceFormat(totalSellingAmount))
        : ""}
      {totalDeliveryFee > 0
        ? renderFieldFee(`Biaya Pengiriman`, `${priceFormat(totalDeliveryFee)}`)
        : ""}

      {paymentCheckLimit.covered > 0 ||
      adminFee > 0 ||
      totalShippingInsurance > 0 ||
      totalProductInsurance > 0 ||
      totalDonation > 0 ||
      voucherValue > 0 ? (
        <Divider my={3} variant="dashed" borderColor="veryLightPink" />
      ) : null}
      {adminFee > 0
        ? renderFieldFee(`Total Biaya Administrasi`, `${priceFormat(adminFee)}`)
        : ""}
      {totalDonation > 0
        ? renderFieldFee("Donasi", priceFormat(totalDonation))
        : ""}
      {totalProductInsurance > 0
        ? renderFieldFee(
            `Biaya Asuransi Produk`,
            `${priceFormat(totalProductInsurance)}`
          )
        : ""}
      {totalShippingInsurance > 0
        ? renderFieldFee(
            `Biaya Asuransi Pengiriman`,
            `${priceFormat(totalShippingInsurance)}`
          )
        : ""}
      {voucherValue > 0
        ? renderFieldFee(
            `Voucher ${voucherCode}`,
            `- ${priceFormat(voucherValue)}`,
            true
          )
        : ""}
      {paymentCheckLimit.covered > 0
        ? renderFieldFee(
            `Pakai ${paymentCheckLimit.name}`,
            `- ${priceFormat(paymentCheckLimit.covered)}`,
            true
          )
        : ""}
    </VStack>
  );
};

export const generateFeePurchaseObject = (
  orders: PaymentCheckoutVerifyResponse,
  statePayment: StateSelectPaymentType[],
  paymentCheckLimit: PaymentCheckLimitType,
  adminCC?: number[]
) => {
  return {
    totalDeliveryFee: orders?.data.orderLog.totalDeliveryFee ?? 0,
    voucherValue: orders?.data.orderLog.voucherValue ?? 0,
    totalShippingInsurance: orders?.data.orderLog.totalShippingInsurance ?? 0,
    totalDonation: orders?.data.orderLog.totalDonation ?? 0,
    voucherType: orders?.data.orderLog.voucherType ?? "",
    totalProductInsurance: orders?.data.orderLog.totalProductInsurance ?? 0,
    totalSellingAmount: orders?.data.orderLog.totalSellingAmount ?? 0,
    adminCC: adminCC ? adminCC.reduce((fee, total) => fee + total, 0) : 0,
    adminFee: statePayment.map((item) => item.adminFee),
    coveredValue: paymentCheckLimit?.covered ?? 0,
  };
};
