import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
  ForumMarkAsSpamIcon,
  Text,
  IconButton,
  Button,
} from "../../user-interfaces";

type modalTextProps = {
  confirmText: string;
  cancelText: string;
  proceedText: string;
};

export type MarkForumAsSpamDesktopProps = {
  onProceed: () => void;
  MODAL_TEXT: modalTextProps;
  isReported: boolean;
  isLoading: boolean;
  stateResultText: string;
  onModalShow: () => void;
  isModalShow: boolean;
  isLogin: boolean;
};

export function MarkForumAsSpamDesktop(props: MarkForumAsSpamDesktopProps) {
  const {
    MODAL_TEXT,
    onProceed,
    isLoading,
    isReported,
    stateResultText,
    onModalShow,
    isModalShow,
    isLogin,
  } = props;
  return (
    <>
      <IconButton
        minW="unset"
        h="unset"
        variant="unstyled"
        icon={<ForumMarkAsSpamIcon boxSize="28px" />}
        aria-label="Forum Mark as Spam"
        onClick={onModalShow}
      />
      <Modal isOpen={isModalShow} onClose={onModalShow} trapFocus={false}>
        <ModalOverlay />
        <ModalContent px={6} paddingTop="60px" paddingBottom={6}>
          <ModalCloseButton
            color="veryLightPink"
            w={7}
            h={7}
            top={4}
            right={4}
          />
          <ModalBody textAlign="center" p={0}>
            {isReported ? (
              <>
                <Text
                  fontSize="xl"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  marginBottom={7}
                >
                  {stateResultText}
                </Text>

                <Button
                  colorScheme="main"
                  w="100%"
                  onClick={onModalShow}
                  py={2}
                  isLoading={isLoading}
                >
                  OK
                </Button>
              </>
            ) : (
              <>
                <Text
                  fontSize="xl"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  marginBottom={7}
                >
                  {MODAL_TEXT.confirmText}
                </Text>

                <VStack spacing={1}>
                  <Button
                    colorScheme="main"
                    w="100%"
                    onClick={onModalShow}
                    py={2}
                    isLoading={isLoading}
                  >
                    {MODAL_TEXT.cancelText}
                  </Button>
                  <Button
                    as={isLogin ? "button" : "a"}
                    variant="ghost"
                    w="100%"
                    py={2}
                    onClick={onProceed}
                    isLoading={isLoading}
                  >
                    {MODAL_TEXT.proceedText}
                  </Button>
                </VStack>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
