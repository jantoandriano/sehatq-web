import React from "react";

import {
  Box,
  Divider,
  Text,
  Skeleton,
  SkeletonText,
  Flex,
  Button,
  HStack,
  Image,
  Link,
} from "@sehatq/components";
import { priceFormat } from "@sehatq/utils";
import { ASSETS } from "@sehatq/constants";
import { OrderDetailProps } from "./payment-type";
import { renderOrderSummary } from "./payment-helpers";

export function OrderDetailDesktop(props: OrderDetailProps) {
  const { grandTotal, onPurchase, isLoadingPurchase, isDisableButonPurchase } =
    props;
  return (
    <Box bgColor="white" p={3} borderRadius="md" boxShadow="sm">
      <Text fontFamily="poppins" fontWeight="semibold">
        Ringkasan Pembayaran
      </Text>
      <Divider my={3} borderColor="veryLightPink" />
      {renderOrderSummary(props)}
      <Divider my={3} variant="dashed" borderColor="veryLightPink" />
      <Flex w="full" justifyContent="space-between" mt={3}>
        <Text fontSize="lg" fontWeight="bold">
          Total Tagihan
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="sea.500">
          {grandTotal >= 0 ? `${priceFormat(grandTotal)}` : "-"}
        </Text>
      </Flex>
      <Box bgColor="#E9F5FC" p={3} mt={5} borderRadius="8px">
        <HStack align="normal">
          <Box w="60px">
            <Image
              src={ASSETS.INFO_ICON}
              alt="info"
              w="30px"
              h="30px"
              align="center"
            />
          </Box>
          <Box>
            <Text fontSize="11px" color="#175E86">
              Dengan melakukan transaksi ini, saya telah menyetujui{" "}
              <Link
                fontSize="11px"
                color="#175E86"
                fontWeight="bold"
                href="https://www.sehatq.com/syarat"
                isExternal
                display="inline"
              >
                Syarat & Ketentuan SehatQ
              </Link>
            </Text>
          </Box>
        </HStack>
      </Box>
      <Button
        onClick={onPurchase}
        w="full"
        mt={3}
        bgColor="squash.500"
        _hover={{ bgColor: "none" }}
        isLoading={isLoadingPurchase}
        isDisabled={isDisableButonPurchase || isLoadingPurchase}
      >
        <Box mr={1}>
          <Image
            src={ASSETS.SECURE_ICON}
            alt="secure"
            w="25px"
            h="25px"
            align="center"
          />
        </Box>
        Bayar
      </Button>
    </Box>
  );
}

export function OrderDetailSkeletonDesktop() {
  return (
    <Box>
      <SkeletonText mb={5} />
      <Skeleton height={10} w="full" />
    </Box>
  );
}
