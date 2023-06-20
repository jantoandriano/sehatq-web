import React from "react";
import {
  Center as ChakraCenter,
  CenterProps as ChakraCenterProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type CenterProps = StripChakraProps<ChakraCenterProps>;

export const Center = forwardRef<CenterProps, "div">(
  (props: CenterProps, ref) => {
    return <ChakraCenter {...props} ref={ref} />;
  }
);

Center.displayName = "Center";
