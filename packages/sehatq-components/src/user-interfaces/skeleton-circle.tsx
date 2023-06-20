import React from "react";
import {
  SkeletonCircle as ChakraSkeletonCircle,
  SkeletonProps as ChakraSkeletonProps,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type SkeletonCircleProps = StripChakraProps<ChakraSkeletonProps>;

export const SkeletonCircle = (props: SkeletonCircleProps) => {
  return <ChakraSkeletonCircle {...props} />;
};

SkeletonCircle.displayName = "SkeletonCircle";
