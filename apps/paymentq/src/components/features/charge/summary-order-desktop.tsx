import React from "react";
import { Stack, Box, Flex, Text, Divider } from "@sehatq/components";
import { generatePriceDisplay } from "@sehatq/utils";
import { type SummaryOrderProps } from "./credit-card-types";
import TermsConditions from "./terms-conditions";

export function SummaryOrderDesktop(props: SummaryOrderProps) {
  return (
    <Box borderRadius="md" backgroundColor="white" boxShadow="md" padding="4">
      <Text fontFamily="poppins" fontWeight="semibold">
        Ringkasan Pembayaran
      </Text>

      <Divider
        borderColor="brownGrey.500"
        border="solid 0.5px"
        orientation="vertical"
        mb={3}
        mt={3}
      />

      <Stack>
        {Boolean(props.summaryDetail.totalSellingAmount) && (
          <SummarySection
            label={`${
              props.summaryDetail.domain === "telemed" &&
              props.summaryDetail.productType === "digital"
                ? "Biaya Konsultasi"
                : "Total Belanja"
            }`}
            value={props.summaryDetail.totalSellingAmount}
          />
        )}

        {Boolean(props.summaryDetail.totalDeliveryFee) && (
          <SummarySection
            label="Biaya Pengiriman"
            value={props.summaryDetail.totalDeliveryFee}
          />
        )}

        {props.summaryDetail.coveredValue ||
        Boolean(props.summaryDetail.totalAdminFee) ||
        Boolean(props.summaryDetail.totalDonation) ||
        Boolean(props.summaryDetail.totalProductInsurance) ||
        Boolean(props.summaryDetail.totalShippingInsurance) ||
        (props.summaryDetail.voucherValue &&
          props.summaryDetail.voucherType.toLowerCase() !== "shipping") ? (
          <Divider
            borderColor="brownGrey.500"
            border="solid 0.5px"
            orientation="vertical"
            variant="dashed"
            mb={3}
            mt={3}
          />
        ) : null}

        {Boolean(props.summaryDetail.totalAdminFee) && (
          <SummarySection
            label="Total Biaya Administrasi"
            value={props.summaryDetail.totalAdminFee}
          />
        )}

        {Boolean(props.summaryDetail.totalDonation) && (
          <SummarySection
            label="Donasi"
            value={props.summaryDetail.totalDonation}
          />
        )}

        {Boolean(props.summaryDetail.totalProductInsurance) && (
          <SummarySection
            label="Biaya Asuransi Produk"
            value={props.summaryDetail.totalProductInsurance}
          />
        )}

        {Boolean(props.summaryDetail.totalShippingInsurance) && (
          <SummarySection
            label="Biaya Asuransi Pengiriman"
            value={props.summaryDetail.totalShippingInsurance}
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
                title={props.summaryDetail.voucherCode}
              >
                Voucher {props.summaryDetail.voucherCode}
              </Text>
              <Text fontSize="xs" color="#D63B3B">
                -
                {generatePriceDisplay(Number(props.summaryDetail.voucherValue))}
              </Text>
            </Flex>
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

        <Divider
          borderColor="brownGrey.500"
          border="solid 0.5px"
          orientation="vertical"
          variant="dashed"
          mb={3}
          mt={3}
        />

        {Boolean(props.summaryDetail.grandTotal) && (
          <>
            <Flex w="full" justifyContent="space-between" mt={3}>
              <Text fontFamily="poppins" fontSize="md" fontWeight="bold">
                Total Tagihan
              </Text>
              <Text
                fontFamily="poppins"
                fontSize="md"
                fontWeight="bold"
                color="sea.500"
              >
                {generatePriceDisplay(Number(props.summaryDetail.grandTotal))}
              </Text>
            </Flex>
          </>
        )}
      </Stack>

      <TermsConditions isMobile={false} />
    </Box>
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
      <Text fontSize="xs" fontWeight="bold">
        {generatePriceDisplay(Number(value))}
      </Text>
    </Flex>
  );
}
