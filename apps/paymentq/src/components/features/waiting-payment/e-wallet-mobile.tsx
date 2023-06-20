import React from "react";
import {
  ArrowBackIcon,
  Container,
  Box,
  Text,
  Button,
  Stack,
} from "@sehatq/components";
import { PaymentGuidance } from "./payment-guidance";
import { OrderDetail } from "./order-detail";
import { type EWalletProps } from "./e-wallet";

export function EWalletMobile(props: EWalletProps) {
  const {
    orderDetail,
    onConfirmPayment,
    onCheckOrder,
    serverTime,
    trackingObj,
    onClickBack,
  } = props;

  return (
    <Container maxW="2xl">
      <Box display="flex" alignItems="center" marginBottom="8">
        <ArrowBackIcon
          cursor="pointer"
          onClick={() => onClickBack()}
          color="main.500"
        />
        <Text ml="3" fontSize="md" fontWeight="600">
          Pembayaran
        </Text>
      </Box>

      <OrderDetail
        data={orderDetail}
        isLoading={orderDetail.isLoading}
        error={orderDetail.error}
        serverTime={serverTime}
        isMobile
        isEWallet
      />

      <Box marginTop="6">
        <PaymentGuidance
          orderDetail={orderDetail}
          trackingObj={trackingObj}
          isEWallet
          isMobile
        />
      </Box>

      <Stack align="stretch" marginTop="6" gap="2">
        <Button fontSize="sm" onClick={() => onConfirmPayment(true)}>
          Konfirmasi Pembayaran
        </Button>
        <Button fontSize="sm" variant="outline" onClick={onCheckOrder}>
          Lihat Pesanan Saya
        </Button>
      </Stack>

      <Text textAlign="center" fontSize="xxs" marginTop="3">
        Pesanan dapat dilihat pada menu Daftar Pesanan di halaman Profil
      </Text>
    </Container>
  );
}
