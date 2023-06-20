import React from "react";
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogProps as ChakraAlertDialogProps,
  AlertDialogCloseButton as ChakraAlertDialogCloseButton,
  AlertDialogBody as ChakraAlertDialogBody,
  ModalBodyProps as ChakraAlertDialogBodyProps,
  AlertDialogFooter as ChakraAlertDialogFooter,
  ModalFooterProps as ChakraAlertDialogFooterProps,
  AlertDialogHeader as ChakraAlertDialogHeader,
  ModalHeaderProps as ChakraAlertDialogHeaderProps,
  AlertDialogContent as ChakraAlertDialogContent,
  ModalContentProps as ChakraAlertDialogContentProps,
  AlertDialogOverlay as ChakraAlertDialogOverlay,
  ModalOverlayProps as ChakraAlertDialogOverlayProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type AlertDialogProps = StripChakraProps<ChakraAlertDialogProps>;

export const AlertDialog = (props: AlertDialogProps) => {
  return <ChakraAlertDialog {...props} />;
};

AlertDialog.displayName = "Alert";

export const AlertDialogCloseButton = () => {
  return <ChakraAlertDialogCloseButton />;
};

AlertDialogCloseButton.displayName = "AlertDialogCloseButton";

export type AlertDialogBodyProps = StripChakraProps<ChakraAlertDialogBodyProps>;

export const AlertDialogBody = forwardRef<AlertDialogBodyProps, "div">(
  (props: AlertDialogBodyProps, ref) => {
    return <ChakraAlertDialogBody {...props} ref={ref} />;
  }
);

AlertDialogBody.displayName = "AlertDialogBody";

export type AlertDialogFooterProps =
  StripChakraProps<ChakraAlertDialogFooterProps>;

export const AlertDialogFooter = forwardRef<AlertDialogFooterProps, "footer">(
  (props: AlertDialogFooterProps, ref) => {
    return <ChakraAlertDialogFooter {...props} ref={ref} />;
  }
);

AlertDialogFooter.displayName = "AlertDialogFooter";

export type AlertDialogHeaderProps =
  StripChakraProps<ChakraAlertDialogHeaderProps>;

export const AlertDialogHeader = forwardRef<AlertDialogHeaderProps, "header">(
  (props: AlertDialogHeaderProps, ref) => {
    return <ChakraAlertDialogHeader {...props} ref={ref} />;
  }
);

AlertDialogHeader.displayName = "AlertDialogHeader";

export type AlertDialogContentProps =
  StripChakraProps<ChakraAlertDialogContentProps>;

export const AlertDialogContent = forwardRef<
  AlertDialogContentProps,
  "section"
>((props: AlertDialogContentProps, ref) => {
  return <ChakraAlertDialogContent {...props} ref={ref} />;
});

AlertDialogContent.displayName = "AlertDialogContent";

export type AlertDialogOverlayProps =
  StripChakraProps<ChakraAlertDialogOverlayProps>;

export const AlertDialogOverlay = forwardRef<AlertDialogOverlayProps, "div">(
  (props: AlertDialogOverlayProps, ref) => {
    return <ChakraAlertDialogOverlay {...props} ref={ref} />;
  }
);

AlertDialogOverlay.displayName = "AlertDialogOverlay";
