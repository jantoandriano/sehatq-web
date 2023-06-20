import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Text,
  Image,
  Box,
} from "@sehatq/components";

type ModalCVVInfoDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalCVVInfoDesktop(props: ModalCVVInfoDesktopProps) {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize="24px">
          CVV
        </ModalHeader>
        <ModalBody>
          <Box align="center">
            <Image
              src="https://static.sehatq.com/tokoq/img/cvv.svg?v=5"
              alt="cvv"
              align="center"
            />
          </Box>
          <Text textAlign="center">
            Nomor CVV (Card Verification Value) adalah 3 digit nomor yang
            tertera di samping tanda tangan di belakang kartu.
          </Text>
        </ModalBody>

        <ModalFooter margin="0 auto">
          <Button
            onClick={onClose}
            bgColor="main.500"
            textTransform="uppercase"
            width="250px"
          >
            ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
