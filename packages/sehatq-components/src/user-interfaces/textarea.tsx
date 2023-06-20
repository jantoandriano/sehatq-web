import React from "react";
import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type TextareaProps = StripChakraProps<ChakraTextareaProps>;

export const Textarea = forwardRef<TextareaProps, "textarea">(
  (props: TextareaProps, ref) => {
    return <ChakraTextarea {...props} ref={ref} />;
  }
);
Textarea.displayName = "Textarea";
