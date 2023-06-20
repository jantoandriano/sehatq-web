import React from "react";
import {
  Code as ChakraCode,
  CodeProps as ChakraCodeProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type CodeProps = StripChakraProps<ChakraCodeProps>;

export const Code = forwardRef<CodeProps, "code">((props: CodeProps, ref) => {
  return <ChakraCode {...props} ref={ref} />;
});

Code.displayName = "Code";
