import React from "react";
import { Flex, Text, Container, CountDown } from "../../user-interfaces";

type CountDownSectionDesktopProps = {
  paymentType: string;
  expiredTime: string;
};

export function CountDownSectionDesktop(props: CountDownSectionDesktopProps) {
  const { paymentType, expiredTime } = props;

  if (paymentType === "ovo") {
    return (
      <Container maxW="2xl" centerContent>
        <Ovo expiredTime={Number(expiredTime)} />
      </Container>
    );
  }

  return (
    <Container maxW="2xl" centerContent>
      <EWallet expiredTime={expiredTime} />
    </Container>
  );
}

function Ovo(props: { expiredTime: number }) {
  const { expiredTime } = props;

  return (
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
      <CountDown
        startCount={expiredTime}
        color="red"
        fontWeight="bold"
        colorScheme="blue"
      />
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
  );
}

function EWallet(props: { expiredTime: string }) {
  const { expiredTime } = props;
  return (
    <Text
      fontFamily="poppins"
      fontSize="md"
      fontWeight="bold"
      color="sea.500"
      as="p"
    >
      {expiredTime}
    </Text>
  );
}
