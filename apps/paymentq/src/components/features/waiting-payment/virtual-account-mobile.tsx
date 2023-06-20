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
import { type VirtualAccountProps } from "./virtual-account";

export function VirtualAccountMobile(props: VirtualAccountProps) {
  const {
    orderDetail,
    onConfirmPayment,
    onCheckOrder,
    serverTime,
    trackingObj,
    onClickBack,
  } = props;

  return (
    <Container
      maxW="lg"
      borderRadius="lg"
      boxShadow="base"
      bgColor="white"
      marginTop="4"
    >
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
      />

      <Box marginTop="6">
        <PaymentGuidance
          orderDetail={orderDetail}
          trackingObj={trackingObj}
          isMobile
        />
      </Box>

      <Stack align="stretch" marginTop="6" gap="2">
        <Button onClick={() => onConfirmPayment(true)} fontSize="sm">
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
