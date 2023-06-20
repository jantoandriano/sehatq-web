import React from "react";
import {
  Stack as ChakraStack,
  StackProps as ChakraStackProps,
  StackDivider as ChakraStackDivider,
  StackDividerProps as ChakraStackDividerProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type StackProps = StripChakraProps<ChakraStackProps>;

export const Stack = forwardRef<StackProps, "div">((props: StackProps, ref) => {
  return <ChakraStack {...props} ref={ref} />;
});

Stack.displayName = "Stack";

export type StackDividerProps = StripChakraProps<ChakraStackDividerProps>;

export const StackDivider = forwardRef<StackDividerProps, "div">(
  (props: StackDividerProps, ref) => {
    return <ChakraStackDivider {...props} ref={ref} />;
  }
);

StackDivider.displayName = "StackDivider";
