import React from "react";
import { Text, Stack, Flex } from "@sehatq/components";
import { generatePriceDisplay } from "@sehatq/utils";
import { type SummaryOrderProps } from "./credit-card-types";

export function SummaryOrderMobile(props: SummaryOrderProps) {
  return (
    <>
      <Stack
        border="1px"
        borderColor="veryLightPink"
        borderRadius="md"
        mt="5"
        padding="4"
      >
        {Boolean(props.summaryDetail.totalSellingAmount) && (
          <SummarySection
            label={`${
              props.summaryDetail.domain === "telemed"
                ? "Total Belanja"
                : "Total Konsultasi"
            }`}
            value={props.summaryDetail.totalSellingAmount}
          />
        )}

        {props.summaryDetail.voucherValue &&
          props.summaryDetail.voucherType.toLowerCase() !== "shipping" && (
            <Flex flexDir="row" justifyContent="space-between" gap="1">
              <Text
                fontSize="xs"
                maxWidth="60%"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                title={`Voucher ${props.summaryDetail.voucherCode}`}
              >
                Voucher {props.summaryDetail.voucherCode}
              </Text>
              <Text fontSize="xs" color="#D63B3B">
                -
                {generatePriceDisplay(Number(props.summaryDetail.voucherValue))}
              </Text>
            </Flex>
          )}

        {Boolean(props.summaryDetail.totalAdminFee) && (
          <SummarySection
            label="Total Biaya Administrasi"
            value={props.summaryDetail.totalAdminFee}
          />
        )}

        {Boolean(props.summaryDetail.totalDeliveryFee) && (
          <SummarySection
            label="Biaya Pengiriman"
            value={props.summaryDetail.totalDeliveryFee}
          />
        )}

        {Boolean(props.summaryDetail.totalShippingInsurance) && (
          <SummarySection
            label="Biaya Asuransi Pengiriman"
            value={props.summaryDetail.totalShippingInsurance}
          />
        )}

        {Boolean(props.summaryDetail.totalProductInsurance) && (
          <SummarySection
            label="Biaya Asuransi Produk"
            value={props.summaryDetail.totalProductInsurance}
          />
        )}

        {Boolean(props.summaryDetail.totalDonation) && (
          <SummarySection
            label="Donasi"
            value={props.summaryDetail.totalDonation}
          />
        )}

        {props.summaryDetail.coveredValue && (
          <Flex flexDir="row" justifyContent="space-between" gap="1">
            <Text fontSize="xs">
              Pakai {props.summaryDetail.paymentMethodPrimary}
            </Text>
            <Text fontSize="xs" color="#D63B3B">
              -{generatePriceDisplay(Number(props.summaryDetail.coveredValue))}
            </Text>
          </Flex>
        )}
      </Stack>
    </>
  );
}

function SummarySection({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
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
      <Text fontSize="xs" fontWeight="medium">
        {generatePriceDisplay(Number(value))}
      </Text>
    </Flex>
  );
}
