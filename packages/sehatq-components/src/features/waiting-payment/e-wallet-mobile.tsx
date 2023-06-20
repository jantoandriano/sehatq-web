import React from "react";
import { Container, Box, Text, Button, Stack } from "../../user-interfaces";
import { PaymentGuidance } from "./payment-guidance";
import { OrderDetail } from "./order-detail";

type PaymentGuidanceType = {
  id: string;
  title: string;
  description: string;
};

type OrderDetailType = {
  coNumber: string;
  paymentTimeout: string;
  paymentType: string;
  grandTotal: string;
  vaNumbers: string;
  currency: string;
};

type EWalletMobileProps = {
  paymentGuidances: PaymentGuidanceType[];
  orderDetail: OrderDetailType;
};

export function EWalletMobile(props: EWalletMobileProps) {
  const { orderDetail, paymentGuidances } = props;

  return (
    <Container maxW="2xl">
      <OrderDetail
        data={orderDetail}
        isLoading={false}
        error=""
        isMobile
        isEWallet
      />

      <Box marginTop="6">
        <PaymentGuidance
          data={paymentGuidances}
          isLoading={false}
          error=""
          isEWallet
          isMobile
        />
      </Box>

      <Stack align="stretch" marginTop="6" gap="2">
        <Button fontSize="sm">Konfirmasi Pembayaran</Button>
        <Button fontSize="sm" variant="outline">
          Lihat Pesanan Saya
        </Button>
      </Stack>

      <Text textAlign="center" fontSize="xxs" marginTop="3">
        Pesanan dapat dilihat pada menu Daftar Pesanan di halaman Profil
      </Text>
    </Container>
  );
}
