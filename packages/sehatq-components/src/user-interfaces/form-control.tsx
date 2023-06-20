import React from "react";
import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormLabel as ChakraFormLabel,
  FormLabelProps as ChakraFormLabelProps,
  FormErrorMessage as ChakraFormErrorMessage,
  FormErrorMessageProps as ChakraFormErrorMessageProps,
  FormHelperText as ChakraFormHelperText,
  HelpTextProps as HelpTextProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type FormControlProps = StripChakraProps<ChakraFormControlProps>;

export const FormControl = forwardRef<FormControlProps, "div">(
  (props: FormControlProps, ref) => {
    return <ChakraFormControl {...props} ref={ref} />;
  }
);

FormControl.displayName = "FormControl";

export type FormLabelProps = StripChakraProps<ChakraFormLabelProps>;

export const FormLabel = forwardRef<FormLabelProps, "label">(
  (props: FormLabelProps, ref) => {
    return <ChakraFormLabel {...props} ref={ref} />;
  }
);

FormLabel.displayName = "FormLabel";

export type FormErrorMessageProps =
  StripChakraProps<ChakraFormErrorMessageProps>;

export const FormErrorMessage = forwardRef<FormErrorMessageProps, "div">(
  (props: FormErrorMessageProps, ref) => {
    return <ChakraFormErrorMessage {...props} ref={ref} />;
  }
);

FormErrorMessage.displayName = "FormErrorMessage";

export type FormHelperTextProps = StripChakraProps<HelpTextProps>;

export const FormHelperText = forwardRef<FormHelperTextProps, "div">(
  (props: FormHelperTextProps, ref) => {
    return <ChakraFormHelperText {...props} ref={ref} />;
  }
);

FormHelperText.displayName = "FormHelperText";
