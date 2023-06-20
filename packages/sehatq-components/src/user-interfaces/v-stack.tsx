import React from "react";
import {
  VStack as ChakraVStack,
  StackProps as ChakraVStackProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type VStackProps = StripChakraProps<ChakraVStackProps>;

export const VStack = forwardRef<VStackProps, "div">(
  (props: VStackProps, ref) => {
    return <ChakraVStack {...props} ref={ref} />;
  }
);

VStack.displayName = "VStack";
