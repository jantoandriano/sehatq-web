import React from "react";
import { Container, Box, Text, Button, Stack } from "@sehatq/components";
import { PaymentGuidance } from "./payment-guidance";
import { OrderDetail } from "./order-detail";
import { type EWalletProps } from "./e-wallet";

export function EWalletDesktop(props: EWalletProps) {
  const {
    orderDetail,
    onConfirmPayment,
    onCheckOrder,
    serverTime,
    trackingObj,
  } = props;
  return (
    <Container maxW="2xl">
      <OrderDetail
        data={orderDetail}
        isLoading={orderDetail.isLoading}
        error={orderDetail.error}
        serverTime={serverTime}
        isEWallet
      />

      <Box marginTop="6">
        <PaymentGuidance
          orderDetail={orderDetail}
          trackingObj={trackingObj}
          isEWallet
        />
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
