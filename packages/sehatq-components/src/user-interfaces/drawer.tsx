import React from "react";
import {
  Drawer as ChakraDrawer,
  DrawerProps as ChakraDrawerProps,
  DrawerCloseButton as ChakraDrawerCloseButton,
  DrawerHeader as ChakraDrawerHeader,
  DrawerFooter as ChakraDrawerFooter,
  DrawerBody as ChakraDrawerBody,
  DrawerOverlay as ChakraDrawerOverlay,
  DrawerContent as ChakraDrawerContent,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type DrawerProps = StripChakraProps<ChakraDrawerProps>;

export const Drawer = (props: DrawerProps) => {
  return <ChakraDrawer {...props} />;
};
Drawer.displayName = "Drawer";

export const DrawerCloseButton = ChakraDrawerCloseButton;
DrawerCloseButton.displayName = "DrawerCloseButton";

export const DrawerHeader = ChakraDrawerHeader;
DrawerHeader.displayName = "DrawerHeader";

export const DrawerBody = ChakraDrawerBody;
DrawerBody.displayName = "DrawerBody";

export const DrawerFooter = ChakraDrawerFooter;
DrawerFooter.displayName = "DrawerFooter";

export const DrawerOverlay = ChakraDrawerOverlay;
DrawerOverlay.displayName = "DrawerOverlay";

export const DrawerContent = ChakraDrawerContent;
DrawerContent.displayName = "DrawerContent";
