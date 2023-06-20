import React from "react";
import {
  Container,
  Box,
  Text,
  Button,
  Stack,
  ArrowBackIcon,
} from "@sehatq/components";
import { PaymentGuidance } from "./payment-guidance";
import { OrderDetail } from "./order-detail";
import { type OvoPageProps } from "./ovo";

export function OvoPageDesktop(props: OvoPageProps) {
  const {
    orderDetail,
    onConfirmPayment,
    onCheckOrder,
    expired,
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
      {expired && (
        <Box display="flex" alignItems="center" marginBottom="8">
          <ArrowBackIcon color="main.500" />
          <Text ml="3" fontSize="md" fontWeight="600">
            Pembayaran
          </Text>
        </Box>
      )}

      <OrderDetail
        data={orderDetail}
        isLoading={orderDetail.isLoading}
        error={orderDetail.error}
        serverTime={serverTime}
        isEWallet
      />

      <Box marginTop="6">
        <PaymentGuidance orderDetail={orderDetail} trackingObj={trackingObj} />
      </Box>
      <Stack align="stretch" marginTop="6" gap="2" marginX="4">
        <Button onClick={() => onConfirmPayment(true)}>
          Konfirmasi Pembayaran
        </Button>
        <Button onClick={onCheckOrder} variant="outline">
          Lihat Pesanan Saya
        </Button>
      </Stack>

      <Text textAlign="center" size="xxs" marginTop="3">
        Pesanan dapat dilihat pada menu Daftar Pesanan di halaman Profil
      </Text>
    </Container>
  );
}
