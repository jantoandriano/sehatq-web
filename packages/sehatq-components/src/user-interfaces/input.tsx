import React from "react";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup as ChakraInputGroup,
  InputGroupProps as ChakraInputGroupProps,
  InputLeftElement as ChakraInputLeftElement,
  InputElementProps as ChakraInputLeftElementProps,
  InputRightElement as ChakraInputRightElement,
  InputElementProps as ChakraInputRightElementProps,
  InputRightAddon as ChakraInputRightAddon,
  InputElementProps as ChakraInputElementPropsProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type InputProps = StripChakraProps<ChakraInputProps>;

export const Input = forwardRef<InputProps, "input">(
  (props: InputProps, ref) => {
    return <ChakraInput {...props} ref={ref} />;
  }
);

Input.displayName = "Input";

export type InputGroupProps = StripChakraProps<ChakraInputGroupProps>;

export const InputGroup = forwardRef<InputGroupProps, "div">(
  (props: InputGroupProps, ref) => {
    return <ChakraInputGroup {...props} ref={ref} />;
  }
);

InputGroup.displayName = "InputGroup";

export type InputLeftElementProps =
  StripChakraProps<ChakraInputLeftElementProps>;

export const InputLeftElement = forwardRef<InputLeftElementProps, "div">(
  (props: InputLeftElementProps, ref) => {
    return <ChakraInputLeftElement {...props} ref={ref} />;
  }
);

InputLeftElement.displayName = "InputLeftElement";
InputLeftElement.id = "InputLeftElement";

export type InputRightElementProps =
  StripChakraProps<ChakraInputRightElementProps>;

export const InputRightElement = forwardRef<InputRightElementProps, "div">(
  (props: InputRightElementProps, ref) => {
    return <ChakraInputRightElement {...props} ref={ref} />;
  }
);

InputRightElement.displayName = "InputRightElement";
InputRightElement.id = "InputRightElement";

export type InputRightAddonElementProps =
  StripChakraProps<ChakraInputElementPropsProps>;

export const InputRightAddon = forwardRef<InputRightAddonElementProps, "div">(
  (props: InputRightAddonElementProps, ref) => {
    return <ChakraInputRightAddon {...props} ref={ref} />;
  }
);

InputRightAddon.displayName = "InputRightAddon";
InputRightAddon.id = "InputRightAddon";
