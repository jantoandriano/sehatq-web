import React from "react";
import {
  Alert as ChakraAlert,
  AlertProps as ChakraAlertProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type AlertProps = StripChakraProps<ChakraAlertProps>;

export const Alert = forwardRef<AlertProps, "div">((props: AlertProps, ref) => {
  return <ChakraAlert {...props} ref={ref} />;
});

Alert.displayName = "Alert";
