import React from "react";
import {
  AspectRatio as ChakraAspectRatio,
  AspectRatioProps as ChakraAspectRatioProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type AspectRatioProps = StripChakraProps<ChakraAspectRatioProps>;

export const AspectRatio = forwardRef<AspectRatioProps, "div">(
  (props: AspectRatioProps, ref) => {
    return <ChakraAspectRatio {...props} ref={ref} />;
  }
);

AspectRatio.displayName = "AspectRatio";
