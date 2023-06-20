import React from "react";
import { Flex, Text, Container } from "@sehatq/components";
import { PAYMENT_TYPES } from "src/constants";

type CountDownSectionDesktopProps = {
  hours: string;
  minutes: string;
  seconds: string;
  paymentType: string;
  transactionTime: string;
};

export function CountDownSectionDesktop(props: CountDownSectionDesktopProps) {
  const { paymentType, seconds, transactionTime } = props;

  if (paymentType === PAYMENT_TYPES.OVO) {
    return (
      <Container maxW="2xl" centerContent>
        <Flex flexDir="row" gap="1">
          <Text
            fontFamily="poppins"
            fontSize="md"
            fontWeight="bold"
            color="sea.500"
            as="p"
          >
            Selesaikan pembayaran dalam waktu
          </Text>
          <Text color="red" fontWeight="bold">
            {seconds}
          </Text>
          <Text
            fontFamily="poppins"
            fontSize="md"
            fontWeight="bold"
            color="sea.500"
            as="p"
          >
            detik
          </Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="2xl" centerContent>
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
