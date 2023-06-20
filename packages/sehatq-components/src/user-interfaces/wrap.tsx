import React from "react";
import {
  Wrap as ChakraWrap,
  WrapProps as ChakraWrapProps,
  WrapItem as ChakraWrapItem,
  WrapItemProps as ChakraWrapItemProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type WrapProps = StripChakraProps<ChakraWrapProps>;

export const Wrap = forwardRef<WrapProps, "div">((props: WrapProps, ref) => {
  return <ChakraWrap {...props} ref={ref} />;
});

Wrap.displayName = "Wrap";

export type WrapItemProps = StripChakraProps<ChakraWrapItemProps>;

export const WrapItem = forwardRef<WrapItemProps, "div">(
  (props: WrapItemProps, ref) => {
    return <ChakraWrapItem {...props} ref={ref} />;
  }
);

WrapItem.displayName = "WrapItem";
