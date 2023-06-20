import React from "react";
import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  ModalOverlay as ChakraModalOverlay,
  ModalOverlayProps as ChakraModalOverlayProps,
  ModalContent as ChakraModalContent,
  ModalContentProps as ChakraModalContentProps,
  ModalHeader as ChakraModalHeader,
  ModalHeaderProps as ChakraModalHeaderProps,
  ModalBody as ChakraModalBody,
  ModalBodyProps as ChakraModalBodyProps,
  ModalFooter as ChakraModalFooter,
  ModalFooterProps as ChakraModalFooterProps,
  ModalCloseButton as ChakraModalCloseButton,
  CloseButtonProps as ChakraModalCloseButtonProps,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type ModalProps = StripChakraProps<ChakraModalProps>;
export const Modal = (props: ModalProps) => {
  return <ChakraModal {...props} />;
};
Modal.displayName = "Modal";

export type ModalOverlayProps = StripChakraProps<ChakraModalOverlayProps>;
export const ModalOverlay = (props: ModalOverlayProps) => {
  return <ChakraModalOverlay {...props} />;
};
ModalOverlay.displayName = "ModalOverlay";

export type ModalContentProps = StripChakraProps<ChakraModalContentProps>;
export const ModalContent = (props: ModalContentProps) => {
  return <ChakraModalContent {...props} />;
};
ModalContent.displayName = "ModalContent";

export type ModalHeaderProps = StripChakraProps<ChakraModalHeaderProps>;
export const ModalHeader = (props: ModalHeaderProps) => {
  return <ChakraModalHeader {...props} />;
};
ModalHeader.displayName = "ModalHeader";

export type ModalBodyProps = StripChakraProps<ChakraModalBodyProps>;
export const ModalBody = (props: ModalBodyProps) => {
  return <ChakraModalBody {...props} />;
};
ModalBody.displayName = "ModalBody";

export type ModalFooterProps = StripChakraProps<ChakraModalFooterProps>;
export const ModalFooter = (props: ModalFooterProps) => {
  return <ChakraModalFooter {...props} />;
};
ModalFooter.displayName = "ModalFooter";

export type ModalCloseButtonProps =
  StripChakraProps<ChakraModalCloseButtonProps>;
export const ModalCloseButton = (props: ModalCloseButtonProps) => {
  return <ChakraModalCloseButton {...props} />;
};
ModalCloseButton.displayName = "ModalCloseButton";
