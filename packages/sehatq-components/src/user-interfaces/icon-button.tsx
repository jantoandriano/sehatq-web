import React from "react";
import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type IconButtonProps = StripChakraProps<ChakraIconButtonProps>;

export const IconButton = forwardRef<IconButtonProps, "button">(
  (props: IconButtonProps, ref) => {
    return <ChakraIconButton {...props} ref={ref} />;
  }
);

IconButton.displayName = "IconButton";
