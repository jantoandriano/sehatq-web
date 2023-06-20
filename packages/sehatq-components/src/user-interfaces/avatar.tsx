import React from "react";
import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type AvatarProps = StripChakraProps<ChakraAvatarProps>;

export const Avatar = forwardRef<AvatarProps, "span">(
  (props: AvatarProps, ref) => {
    return <ChakraAvatar {...props} ref={ref} />;
  }
);

Avatar.displayName = "Avatar";
