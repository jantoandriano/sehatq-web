import React, { Fragment } from "react";

import {
  Box,
  Text,
  Skeleton,
  SkeletonText,
  Flex,
  HStack,
  Button,
  Image,
  Link,
  ChevronDownIcon,
} from "@sehatq/components";
import { priceFormat } from "@sehatq/utils";
import { ASSETS } from "@sehatq/constants";
import { renderOrderSummary } from "./payment-helpers";
import { OrderDetailProps } from "./payment-type";

export type OrderDetailMobileProps = {
  onConfrim: () => void;
} & OrderDetailProps;

export function OrderDetailMobile(props: OrderDetailMobileProps) {
  const {
    grandTotal,
    onPurchase,
    isLoadingPurchase,
    isDisableButonPurchase,
    onConfrim,
  } = props;
  return (
    <Fragment>
      <Box bgColor="#E9F5FC" p={3} mb={5} borderRadius="8px">
        <HStack align="normal">
          <Box w="50px">
            <Image
              src={ASSETS.INFO_ICON}
              alt="info"
              w="30px"
              h="30px"
              align="center"
            />
          </Box>
          <Box>
            <Text fontSize="12px" color="#175E86">
              Dengan melakukan transaksi ini, saya telah menyetujui{" "}
              <Text as="span">
                <Link
                  fontSize="12px"
                  fontWeight="bold"
                  color="#175E86"
                  href="https://www.sehatq.com/syarat"
                  isExternal
                >
                  Syarat & Ketentuan SehatQ
                </Link>
              </Text>
            </Text>
          </Box>
        </HStack>
      </Box>
      <Box bgColor="white" p={3} borderRadius="md" boxShadow="sm">
        {renderOrderSummary(props)}
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bgColor="white"
          borderTopRadius="lg"
          boxShadow="md"
          p={5}
        >
          <Flex alignItems="center">
            <Box flexGrow={1}>
              <Text color="brownGrey.500" fontSize="sm">
                Total Tagihan
              </Text>
              <Text fontWeight="bold" color="sea.500">
                {grandTotal >= 0 ? `${priceFormat(grandTotal)}` : "-"}{" "}
                <Box as="span" onClick={() => onConfrim()}>
                  <ChevronDownIcon color="#A7A7A7" w={6} h={8} />
                </Box>
              </Text>
            </Box>
            <Button
              onClick={onPurchase}
              flexGrow={1}
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
          </Flex>
        </Box>
      </Box>
    </Fragment>
  );
}

export function OrderDetailSkeletonMobile() {
  return (
    <Box>
      <SkeletonText mb={5} />
      <Skeleton height={14} w="full" />
    </Box>
  );
}
