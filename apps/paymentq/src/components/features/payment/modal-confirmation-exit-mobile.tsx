import React from "react";
import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  VStack,
  Center,
  Image,
} from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";

type ModalConfirmationExitMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
};

export function ModalConfirmationExitMobile(
  props: ModalConfirmationExitMobileProps
) {
  const { isOpen, onClose, onConfrim } = props;
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
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

          <VStack mt={4}>
            <Button onClick={onClose} isFullWidth bgColor="main">
              Lanjut Pembayaran
            </Button>
            <Button
              onClick={onConfrim}
              bgColor="white"
              color="sea.500"
              _hover={{ bgColor: "none" }}
            >
              Kembali ke Halaman Sebelumnya
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
