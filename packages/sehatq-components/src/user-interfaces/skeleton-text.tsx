import React from "react";
import {
  SkeletonText as ChakraSkeletonText,
  SkeletonTextProps as ChakraSkeletonTextProps,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type SkeletonTextProps = StripChakraProps<ChakraSkeletonTextProps>;

export const SkeletonText = (props: SkeletonTextProps) => {
  return <ChakraSkeletonText {...props} />;
};

SkeletonText.displayName = "SkeletonText";
