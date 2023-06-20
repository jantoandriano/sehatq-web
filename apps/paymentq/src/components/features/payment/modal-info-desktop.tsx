import React from "react";
import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  Button,
  Image,
} from "@sehatq/components";
import { type ModalInfoGeneralProps } from "./modal-info";

export function ModalInfoDesktop(props: ModalInfoGeneralProps) {
  const { isOpenModalInfo, modalData, onConfrim } = props;
  return (
    <Modal
      isOpen={isOpenModalInfo}
      onClose={onConfrim}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) " />
      <ModalContent w="580px" maxW="100%" textAlign="center" paddingY="32px">
        {modalData?.image && (
          <Center>
            <Image
              src={modalData?.image || ""}
              alt="icon payment"
              width="200px"
            />
          </Center>
        )}
        <ModalHeader fontSize="24px">{modalData?.title || ""}</ModalHeader>
        <ModalBody fontSize="16px" fontWeight="400" mb="10px">
          {modalData?.description || ""}
        </ModalBody>

        <ModalFooter margin="0 auto">
          <HStack>
            <Button onClick={onConfrim}>{modalData?.btnText || ""}</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
