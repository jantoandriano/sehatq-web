import React from "react";

import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  Image,
  VStack,
} from "@sehatq/components";

type ModalCVVInfoMobileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalCVVInfoMobile(props: ModalCVVInfoMobileProps) {
  const { isOpen, onClose } = props;
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent roundedTop="xl" pt={5} pb={10}>
        <DrawerBody>
          <VStack>
            <Text fontWeight="bold">CVV</Text>
            <Image
              src="https://static.sehatq.com/tokoq/img/cvv.svg?v=5"
              alt="cvv"
            />
            <Text textAlign="center">
              Nomor CVV (Card Verification Value) adalah 3 digit nomor yang
              tertera di samping tanda tangan di belakang kartu.
            </Text>
            <Button onClick={onClose} bgColor="main.500" width="50%">
              OK
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
