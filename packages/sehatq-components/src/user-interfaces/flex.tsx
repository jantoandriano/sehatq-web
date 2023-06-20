import React from "react";
import {
  Flex as ChakraFlex,
  FlexProps as ChakraFlexProps,
  Spacer as ChakraSpacer,
  SpacerProps as ChakraSpacerProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type FlexProps = StripChakraProps<ChakraFlexProps>;

export const Flex = forwardRef<FlexProps, "div">((props: FlexProps, ref) => {
  return <ChakraFlex {...props} ref={ref} />;
});

Flex.displayName = "Flex";

export type SpacerProps = StripChakraProps<ChakraSpacerProps>;

export const Spacer = forwardRef<SpacerProps, "div">(
  (props: SpacerProps, ref) => {
    return <ChakraSpacer {...props} ref={ref} />;
  }
);

Spacer.displayName = "Spacer";
