import React from "react";
import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type TextProps = StripChakraProps<ChakraTextProps>;

export const Text = forwardRef<TextProps, "p">((props: TextProps, ref) => {
  return <ChakraText {...props} ref={ref} />;
});

Text.displayName = "Text";
