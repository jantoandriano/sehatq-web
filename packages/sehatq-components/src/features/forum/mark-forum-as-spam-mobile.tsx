import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  VStack,
  Text,
  IconButton,
  ForumMarkAsSpamIcon,
  Button,
} from "../../user-interfaces";

type modalTextProps = {
  confirmText: string;
  cancelText: string;
  proceedText: string;
};

export type MarkForumAsSpamMobileProps = {
  onProceed: () => void;
  MODAL_TEXT: modalTextProps;
  isReported: boolean;
  isLoading: boolean;
  stateResultText: string;
  onModalShow: () => void;
  isModalShow: boolean;
  isLogin: boolean;
};

export function MarkForumAsSpamMobile(props: MarkForumAsSpamMobileProps) {
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
        icon={<ForumMarkAsSpamIcon boxSize="24px" />}
        aria-label="Forum Mark as Spam"
        onClick={onModalShow}
      />
      <Drawer placement="bottom" isOpen={isModalShow} onClose={onModalShow}>
        <DrawerOverlay />
        <DrawerContent py="6" px="6" borderTopRadius="lg">
          <DrawerBody p="0" textAlign="center">
            {isReported ? (
              <>
                <Text
                  fontSize="md"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  marginBottom={7}
                >
                  {stateResultText}
                </Text>

                <Button
                  size="sm"
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
                  fontSize="md"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  marginBottom={7}
                >
                  {MODAL_TEXT.confirmText}
                </Text>

                <VStack spacing={1}>
                  <Button
                    size="sm"
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
                    size="sm"
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
