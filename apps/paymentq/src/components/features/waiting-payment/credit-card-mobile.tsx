import React from "react";
import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  Center,
  Image,
} from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";
import { type CreditCardProps } from "./credit-card";

export function CreditCardMobile(props: CreditCardProps) {
  const { modalConfirmCC, onCancelCreditCard } = props;

  return (
    <Drawer
      placement="bottom"
      isOpen={modalConfirmCC}
      onClose={onCancelCreditCard}
    >
      <DrawerOverlay />
      <DrawerContent roundedTop="xl" pt={5} pb={10}>
        <DrawerBody>
          <Center>
            <Image
              src={ASSETS.MODAL_CANCEL_PAYMENT}
              alt="SehatQ"
              width={160}
              height={160}
            />
          </Center>
          <Text fontFamily="poppins" textAlign="center" fontSize="18px">
            Kembali ke Halaman Sebelumnya?
          </Text>
          <Text textAlign="center" lineHeight="24px" mt="5px">
            Jika kembali ke halaman sebelumnya, semua informasi yang telah Kamu
            masukkan akan hilang
          </Text>

          <Button
            onClick={onCancelCreditCard}
            isFullWidth
            bgColor="main"
            mt={3}
          >
            Lanjut Pembayaran
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
