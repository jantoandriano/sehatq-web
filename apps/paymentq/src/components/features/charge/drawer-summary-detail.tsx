import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Text,
  Flex,
  Stack,
  Divider,
} from "@sehatq/components";
import { generatePriceDisplay } from "@sehatq/utils";
import { ModalSummaryOrders } from "./credit-card-types";

function DrawerSummaryDetail(props: ModalSummaryOrders) {
  return (
    <Drawer
      placement="bottom"
      onClose={props.onOpenModal}
      isOpen={props.isOpenModal}
    >
      <DrawerOverlay />
      <DrawerContent roundedTop="xl" pb={2}>
        <DrawerBody>
          <Stack borderRadius="md" padding="2">
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
                    {generatePriceDisplay(
                      Number(props.summaryDetail.voucherValue)
                    )}
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
                  -
                  {generatePriceDisplay(
                    Number(props.summaryDetail.coveredValue)
                  )}
                </Text>
              </Flex>
            )}

            <Divider my={3} variant="dashed" borderColor="veryLightPink" />
            <Flex w="full" justifyContent="space-between" mt={3}>
              <Text fontSize="lg" fontWeight="bold">
                Total Tagihan
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="sea.500">
                {props.summaryDetail.grandTotal &&
                  `${generatePriceDisplay(
                    Number(props.summaryDetail.grandTotal)
                  )}`}
              </Text>
            </Flex>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerSummaryDetail;

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
