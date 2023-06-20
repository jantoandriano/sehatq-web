import React from "react";
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type CheckboxProps = StripChakraProps<ChakraCheckboxProps>;

export const Checkbox = forwardRef<CheckboxProps, "input">(
  (props: CheckboxProps, ref) => {
    return <ChakraCheckbox {...props} ref={ref} />;
  }
);

Checkbox.displayName = "Checkbox";
