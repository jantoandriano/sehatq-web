import React from "react";
import {
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type ListItemProps = StripChakraProps<ChakraListItemProps>;

export const ListItem = forwardRef<ListItemProps, "li">(
  (props: ListItemProps, ref) => {
    return <ChakraListItem {...props} ref={ref} />;
  }
);

ListItem.displayName = "ListItem";
