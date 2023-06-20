import React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type ButtonProps = StripChakraProps<ChakraButtonProps>;

export const Button = forwardRef<ButtonProps, "button">(
  (props: ButtonProps, ref) => {
    return <ChakraButton {...props} ref={ref} />;
  }
);

Button.displayName = "Button";
