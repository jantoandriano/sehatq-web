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
import { type CreditCardProps } from "./credit-card";

export function CreditCardDesktop(props: CreditCardProps) {
  const { modalConfirmCC, onCancelCreditCard } = props;

  return (
    <Modal
      isOpen={modalConfirmCC}
      isCentered
      motionPreset="slideInBottom"
      onClose={onCancelCreditCard}
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
          Halaman yang anda tuju sudah tidak berlaku lagi
        </ModalHeader>
        <ModalBody
          fontSize="16px"
          pt="0"
          mt="0"
          fontWeight="400"
          lineHeight="24px"
        >
          Halaman yang anda tuju sudah tidak berlaku lagi, transaksi anda akan
          di cancel oleh system. Silahkan melakukan transaksi kembali.
        </ModalBody>

        <VStack padding="0 20px" my={3}>
          <Button isFullWidth onClick={onCancelCreditCard} bgColor="main">
            Lihat data transaksi
          </Button>
        </VStack>
      </ModalContent>
    </Modal>
  );
}
