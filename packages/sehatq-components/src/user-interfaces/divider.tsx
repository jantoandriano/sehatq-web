import React from "react";
import {
  Divider as ChakraDivider,
  DividerProps as ChakraDIviderProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type DividerProps = StripChakraProps<ChakraDIviderProps>;

export const Divider = forwardRef<DividerProps, "hr">(
  (props: DividerProps, ref) => {
    return <ChakraDivider {...props} ref={ref} />;
  }
);

Divider.displayName = "Divider";
