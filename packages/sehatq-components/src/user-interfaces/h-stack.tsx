import React from "react";
import {
  HStack as ChakraHStack,
  StackProps as ChakraHStackProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type HStackProps = StripChakraProps<ChakraHStackProps>;

export const HStack = forwardRef<HStackProps, "div">(
  (props: HStackProps, ref) => {
    return <ChakraHStack {...props} ref={ref} />;
  }
);

HStack.displayName = "HStack";
