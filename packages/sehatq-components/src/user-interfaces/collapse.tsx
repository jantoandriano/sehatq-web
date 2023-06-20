import React from "react";
import {
  Collapse as ChakraCollapse,
  CollapseProps as ChakraCollapseProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type CollapseProps = StripChakraProps<ChakraCollapseProps>;

export const Collapse = forwardRef<CollapseProps, "span">(
  (props: CollapseProps, ref) => {
    return <ChakraCollapse {...props} ref={ref} />;
  }
);

Collapse.displayName = "Collapse";
