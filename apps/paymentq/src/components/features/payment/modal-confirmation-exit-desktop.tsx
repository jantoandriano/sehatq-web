import React from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  VStack,
  Image,
  Center,
  ModalCloseButton,
} from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";

type ModalConfirmationExitDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
};

export function ModalConfirmationExitDesktop(
  props: ModalConfirmationExitDesktopProps
) {
  const { isOpen, onClose, onConfrim } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) " />
      <ModalContent w="30%" maxW="60%" textAlign="center">
        <ModalCloseButton />
        <Center>
          <Image
            src={ASSETS.MODAL_CANCEL_PAYMENT}
            alt="SehatQ"
            width={200}
            height={200}
          />
        </Center>
        <ModalHeader
          padding="0 0 8px 0"
          mb="0"
          fontSize="18px"
          fontFamily="poppins"
        >
          Kembali ke Halaman Sebelumnya?
        </ModalHeader>
        <ModalBody
          fontSize="16px"
          pt="0"
          mt="0"
          fontWeight="400"
          lineHeight="24px"
        >
          Jika kembali ke halaman sebelumnya, semua informasi yang telah Kamu
          masukkan akan hilang
        </ModalBody>

        <VStack padding="0 20px" my={3}>
          <Button isFullWidth onClick={onClose} bgColor="main">
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
      </ModalContent>
    </Modal>
  );
}
