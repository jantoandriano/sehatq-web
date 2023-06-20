import React from "react";
import {
  SimpleGrid as ChakraSimpleGrid,
  SimpleGridProps as ChakraSimpleGridProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type SimpleGridProps = StripChakraProps<ChakraSimpleGridProps>;

export const SimpleGrid = forwardRef<SimpleGridProps, "div">(
  (props: SimpleGridProps, ref) => {
    return <ChakraSimpleGrid {...props} ref={ref} />;
  }
);

SimpleGrid.displayName = "SimpleGrid";
