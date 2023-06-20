import React from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  Button,
} from "@sehatq/components";

type ModalConfirmationExitDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
  isLoadingCancelPurchase?: boolean;
};

export function ModalConfirmationExitDesktop(
  props: ModalConfirmationExitDesktopProps
) {
  const { isOpen, onClose, onConfrim, isLoadingCancelPurchase } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) " />
      <ModalContent w="877px" maxW="100%" textAlign="center" paddingY="74px">
        <ModalHeader fontSize="24px">
          Cancel payment using this method?
        </ModalHeader>
        <ModalBody fontSize="16px" fontWeight="400" mb="10px">
          If cancelled, all filled information will not be saved.
        </ModalBody>

        <ModalFooter margin="0 auto">
          <HStack>
            <Button
              onClick={onClose}
              bgColor="iceBlue.900"
              isDisabled={isLoadingCancelPurchase}
            >
              No
            </Button>
            <Button
              onClick={onConfrim}
              bgColor="cherry.300"
              isLoading={isLoadingCancelPurchase}
            >
              Yes, cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
