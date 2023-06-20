import React from "react";
import { Text, Container, CountDown } from "../../user-interfaces";

type CountDownSectionMobileProps = {
  paymentType: string;
  expiredTime: string;
};

export function CountDownSectionMobile(props: CountDownSectionMobileProps) {
  const { paymentType, expiredTime } = props;

  if (paymentType === "ovo") {
    return (
      <Container maxW="sm" centerContent>
        <Ovo expiredTime={Number(expiredTime)} />
      </Container>
    );
  }

  return (
    <Container maxW="sm" centerContent>
      <EWallet expiredTime={String(expiredTime)} />
    </Container>
  );
}

function Ovo(props: { expiredTime: number }) {
  const { expiredTime } = props;

  return (
    <Text
      fontFamily="poppins"
      fontSize="md"
      fontWeight="bold"
      color="sea.500"
      as="p"
      textAlign="center"
    >
      Selesaikan pembayaran dalam waktu
      <CountDown
        startCount={expiredTime}
        color="red"
        fontWeight="bold"
        colorScheme="blue"
        marginLeft="1"
        marginRight="1"
      />
      detik
    </Text>
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
