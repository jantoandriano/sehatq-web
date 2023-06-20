import React from "react";
import {
  Skeleton as ChakraSkeleton,
  SkeletonProps as ChakraSkeletonProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type SkeletonProps = StripChakraProps<ChakraSkeletonProps>;

export const Skeleton = forwardRef<SkeletonProps, "div">(
  (props: SkeletonProps, ref) => {
    return <ChakraSkeleton {...props} ref={ref} />;
  }
);

Skeleton.displayName = "Skeleton";
