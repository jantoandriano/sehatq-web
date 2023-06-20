import React from "react";
import {
  Popover as ChakraPopover,
  PopoverProps as ChakraPopoverProps,
  PopoverTrigger as ChakraPopoverTrigger,
  PopoverContent as ChakraPopoverContent,
  PopoverContentProps as ChakraPopoverContentProps,
  PopoverHeader as ChakraPopoverHeader,
  PopoverHeaderProps as ChakraPopoverHeaderProps,
  PopoverBody as ChakraPopoverBody,
  PopoverBodyProps as ChakraPopoverBodyProps,
  PopoverFooter as ChakraPopoverFooter,
  PopoverFooterProps as ChakraPopoverFooterProps,
  PopoverArrow as ChakraPopoverArrow,
  PopoverArrowProps as ChakraPopoverArrowProps,
  PopoverCloseButton as ChakraPopoverCloseButton,
  PopoverCloseButtonProps as ChakraPopoverCloseButtonProps,
  PopoverAnchor as ChakraPopoverAnchor,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type PopoverProps = StripChakraProps<ChakraPopoverProps>;
export const Popover = (props: PopoverProps) => {
  return <ChakraPopover {...props} />;
};
Popover.displayName = "Popover";

export type PopoverTriggerProps = StripChakraProps<unknown>;
export const PopoverTrigger = (props: PopoverTriggerProps) => {
  return <ChakraPopoverTrigger {...props} />;
};
PopoverTrigger.displayName = "PopoverTrigger";

export type PopoverContentProps = StripChakraProps<ChakraPopoverContentProps>;
export const PopoverContent = (props: PopoverContentProps) => {
  return <ChakraPopoverContent {...props} />;
};
PopoverContent.displayName = "PopoverContent";

export type PopoverHeaderProps = StripChakraProps<ChakraPopoverHeaderProps>;
export const PopoverHeader = (props: PopoverHeaderProps) => {
  return <ChakraPopoverHeader {...props} />;
};
PopoverHeader.displayName = "PopoverHeader";

export type PopoverBodyProps = StripChakraProps<ChakraPopoverBodyProps>;
export const PopoverBody = (props: PopoverBodyProps) => {
  return <ChakraPopoverBody {...props} />;
};
PopoverBody.displayName = "PopoverBody";

export type PopoverFooterProps = StripChakraProps<ChakraPopoverFooterProps>;
export const PopoverFooter = (props: PopoverFooterProps) => {
  return <ChakraPopoverFooter {...props} />;
};
PopoverFooter.displayName = "PopoverFooter";

export type PopoverArrowProps = StripChakraProps<ChakraPopoverArrowProps>;
export const PopoverArrow = (props: PopoverArrowProps) => {
  return <ChakraPopoverArrow {...props} />;
};
PopoverArrow.displayName = "PopoverArrow";

export type PopoverCloseButtonProps =
  StripChakraProps<ChakraPopoverCloseButtonProps>;
export const PopoverCloseButton = (props: PopoverCloseButtonProps) => {
  return <ChakraPopoverCloseButton {...props} />;
};
PopoverCloseButton.displayName = "PopoverCloseButton";

export type PopoverAnchorProps = StripChakraProps<unknown>;
export const PopoverAnchor = (props: PopoverAnchorProps) => {
  return <ChakraPopoverAnchor {...props} />;
};
PopoverAnchor.displayName = "PopoverAnchor";
