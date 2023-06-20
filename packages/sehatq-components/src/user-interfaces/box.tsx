import React from "react";
import {
  Box as ChakraBox,
  BoxProps as ChakraBoxProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type BoxProps = StripChakraProps<ChakraBoxProps>;

export const Box = forwardRef<BoxProps, "div">((props: BoxProps, ref) => {
  return <ChakraBox {...props} ref={ref} />;
});

Box.displayName = "Box";
