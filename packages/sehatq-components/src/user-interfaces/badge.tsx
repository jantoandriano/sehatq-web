import React from "react";
import {
  Badge as ChakraBadge,
  BadgeProps as ChakraBadgeProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type BadgeProps = StripChakraProps<ChakraBadgeProps>;

export const Badge = forwardRef<BadgeProps, "button">(
  (props: BadgeProps, ref) => {
    return <ChakraBadge {...props} ref={ref} />;
  }
);

Badge.displayName = "Badge";
