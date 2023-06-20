import React from "react";
import { Container, Box, Text, Button, Stack } from "@sehatq/components";
import { OrderDetail } from "./order-detail";
import { PaymentGuidance } from "./payment-guidance";
import { type VirtualAccountProps } from "./virtual-account";

export function VirtualAccountDesktop(props: VirtualAccountProps) {
  const {
    orderDetail,
    onConfirmPayment,
    onCheckOrder,
    serverTime,
    trackingObj,
  } = props;

  return (
    <Container
      maxW="3xl"
      borderRadius="lg"
      boxShadow="base"
      bgColor="white"
      marginY="4"
      padding="3"
    >
      <OrderDetail
        data={orderDetail}
        isLoading={orderDetail.isLoading}
        error={orderDetail.error}
        serverTime={serverTime}
      />

      <Box marginTop="6">
        <PaymentGuidance orderDetail={orderDetail} trackingObj={trackingObj} />
      </Box>

      <Stack align="stretch" marginTop="6" gap="2" marginX="4">
        <Button onClick={() => onConfirmPayment(true)}>
          Konfirmasi Pembayaran
        </Button>
        <Button variant="outline" onClick={onCheckOrder}>
          Lihat Pesanan Saya
        </Button>
      </Stack>

      <Text textAlign="center" size="xxs" marginTop="3">
        Pesanan dapat dilihat pada menu Daftar Pesanan di halaman Profil
      </Text>
    </Container>
  );
}
