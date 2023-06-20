import React from "react";
import {
  Container as ChakraContainer,
  ContainerProps as ChakraContainerProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type ContainerProps = StripChakraProps<ChakraContainerProps>;

export const Container = forwardRef<ContainerProps, "div">(
  (props: ContainerProps, ref) => {
    return <ChakraContainer {...props} ref={ref} />;
  }
);

Container.displayName = "Container";
