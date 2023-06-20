import React from "react";
import { Box, Button, Divider, Flex, Text } from "@sehatq/components";

export type ShippingAddressProps = {
  id: number;
  label: string;
  receiver: string;
  address: string;
  phone: string;
  googlePlaceId: string;
  handleChangeScreen: () => void;
};

export function ShippingAddress(props: ShippingAddressProps) {
  const { label, receiver, phone, address, handleChangeScreen } = props;

  return (
    <Box background="iceBlue.500" padding="16px">
      <Flex justifyContent="space-between">
        <Text fontFamily="poppins" fontSize="sm" fontWeight="semibold">
          Tujuan Pengiriman
        </Text>
        <Button
          variant="link"
          fontWeight="semibold"
          color="sea.500"
          size="xs"
          onClick={handleChangeScreen}
        >
          Ubah Alamat
        </Button>
      </Flex>
      <Box background="white" marginTop="12px" borderRadius="8px">
        <Text p="14px" fontSize="xs" fontWeight="semibold">
          {label}
        </Text>
        <Divider borderColor="veryLightPink" border="solid 0.5px" />
        <Box p="14px">
          <Text mb="2px" fontSize="xs" fontWeight="semibold">
            {receiver}
          </Text>
          <Text mb="2px" fontSize="xs" fontWeight="semibold">
            {phone}
          </Text>
          <Text fontSize="xs">{address}</Text>
        </Box>
      </Box>
    </Box>
  );
}
