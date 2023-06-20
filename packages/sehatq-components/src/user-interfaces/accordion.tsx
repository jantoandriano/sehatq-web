import React from "react";
import {
  Accordion as ChakraAccordion,
  AccordionProps as ChakraAccordionProps,
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps as ChakraAccordionItemProps,
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
  AccordionPanel as ChakraAccordionPanel,
  AccordionPanelProps as ChakraAccordionPanelProps,
  AccordionIcon as ChakraAccordionIcon,
  IconProps as ChakraAccordionIconProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type AccordionProps = StripChakraProps<ChakraAccordionProps>;

export const Accordion = forwardRef<AccordionProps, "div">(
  (props: AccordionProps, ref) => {
    return <ChakraAccordion {...props} ref={ref} />;
  }
);

Accordion.displayName = "Accordion";

export type AccordionItemProps = StripChakraProps<ChakraAccordionItemProps>;

export const AccordionItem = forwardRef<AccordionItemProps, "div">(
  (props: AccordionItemProps, ref) => {
    return <ChakraAccordionItem {...props} ref={ref} />;
  }
);

AccordionItem.displayName = "AccordionItem";

export type AccordionButtonProps = StripChakraProps<ChakraAccordionButtonProps>;

export const AccordionButton = forwardRef<AccordionButtonProps, "button">(
  (props: AccordionButtonProps, ref) => {
    return <ChakraAccordionButton {...props} ref={ref} />;
  }
);

AccordionButton.displayName = "AccordionButton";

export type AccordionPanelProps = StripChakraProps<ChakraAccordionPanelProps>;

export const AccordionPanel = forwardRef<AccordionPanelProps, "div">(
  (props: AccordionPanelProps, ref) => {
    return <ChakraAccordionPanel {...props} ref={ref} />;
  }
);

AccordionPanel.displayName = "AccordionPanel";

export type AccordionIconProps = StripChakraProps<ChakraAccordionIconProps>;

export const AccordionIcon = forwardRef<
  AccordionIconProps,
  React.FC<ChakraAccordionIconProps>
>((props: AccordionIconProps) => {
  return <ChakraAccordionIcon {...props} />;
});

AccordionIcon.displayName = "AccordionIcon";
