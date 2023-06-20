import React from "react";
import {
  Switch as ChakraSwitch,
  SwitchProps as ChakraSwitchProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type SwitchProps = StripChakraProps<ChakraSwitchProps>;

export const Switch = forwardRef<SwitchProps, "div">(
  (props: SwitchProps, ref) => {
    return <ChakraSwitch {...props} ref={ref} />;
  }
);

Switch.displayName = "Switch";
