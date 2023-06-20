import React from "react";
import {
  Box,
  Text,
  Divider,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
} from "@sehatq/components";
import { priceFormat } from "@sehatq/utils";
import { OrderDetailProps } from "./payment-type";
import { renderOrderSummary } from "./payment-helpers";

type ModalOrderDetailProps = {
  isOpenModalOrder: boolean;
  onConfrim: () => void;
} & OrderDetailProps;

export function ModalOrderDetail(props: ModalOrderDetailProps) {
  const { grandTotal, isOpenModalOrder, onConfrim } = props;

  return (
    <Drawer placement="bottom" onClose={onConfrim} isOpen={isOpenModalOrder}>
      <DrawerOverlay />
      <DrawerContent roundedTop="xl" pb={2}>
        <DrawerBody>
          <Box w="full" textAlign="center">
            <Box
              w="40px"
              h="4px"
              display="inline-block"
              borderRadius="4px"
              backgroundColor="#D8D8D8"
              verticalAlign="middle"
              onClick={onConfrim}
            />
          </Box>
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
