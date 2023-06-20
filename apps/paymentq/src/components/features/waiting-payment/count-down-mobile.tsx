import React from "react";
import { Text, Container } from "@sehatq/components";
import { PAYMENT_TYPES } from "src/constants";

type CountDownSectionMobileProps = {
  hours: string;
  minutes: string;
  seconds: string;
  paymentType: string;
  transactionTime: string;
};

export function CountDownSectionMobile(props: CountDownSectionMobileProps) {
  const { paymentType, seconds, transactionTime } = props;

  if (paymentType === PAYMENT_TYPES.OVO) {
    return (
      <Container maxW="sm" centerContent>
        <Text
          fontFamily="poppins"
          fontSize="md"
          fontWeight="bold"
          color="sea.500"
          as="p"
          textAlign="center"
        >
          Selesaikan pembayaran dalam waktu
        </Text>

        <Text color="red" fontWeight="bold" marginLeft="1" marginRight="1">
          {seconds}
        </Text>

        <Text
          fontFamily="poppins"
          fontSize="md"
          fontWeight="bold"
          color="sea.500"
          as="p"
          textAlign="center"
        >
          detik
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="sm" centerContent>
      <Text
        fontFamily="poppins"
        fontSize="md"
        fontWeight="bold"
        color="sea.500"
        as="p"
      >
        {transactionTime}
      </Text>
    </Container>
  );
}
