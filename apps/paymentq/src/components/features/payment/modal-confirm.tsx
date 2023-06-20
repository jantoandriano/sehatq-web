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

interface ModalConfirmProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText: string;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  confirmText = "Ok",
  cancelText,
  title,
  message = "",
  isLoading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) " />
      <ModalContent
        mx="15px"
        w="877px"
        maxW="100%"
        textAlign="center"
        paddingY="74px"
      >
        {title ? <ModalHeader fontSize="24px">{title}</ModalHeader> : null}
        <ModalBody fontSize="16px" fontWeight="400" mb="10px">
          {message}
        </ModalBody>

        <ModalFooter margin="0 auto">
          <HStack>
            {confirmText && onConfirm ? (
              <Button
                minW="250px"
                maxW="90%"
                colorScheme="sea"
                onClick={onConfirm}
                variant="outline"
              >
                {confirmText}
              </Button>
            ) : null}
            <Button
              minW="250px"
              maxW="90%"
              colorScheme="sea"
              onClick={onCancel}
              isLoading={isLoading}
            >
              {cancelText}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
