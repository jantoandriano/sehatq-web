import React from "react";
import {
  List as ChakraList,
  ListProps as ChakraListProps,
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
  UnorderedList as ChakraUnorderedList,
  OrderedList as ChakraOrderedList,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type ListProps = StripChakraProps<ChakraListProps>;

export const List = forwardRef<ListProps, "ul">((props: ListProps, ref) => {
  return <ChakraList {...props} ref={ref} />;
});

List.displayName = "List";

export type ListItemProps = StripChakraProps<ChakraListItemProps>;

export const ListItem = forwardRef<ListItemProps, "li">(
  (props: ListItemProps, ref) => {
    return <ChakraListItem {...props} ref={ref} />;
  }
);

ListItem.displayName = "ListItem";

export const UnorderedList = forwardRef<ListProps, "ul">(
  (props: ListProps, ref) => {
    return <ChakraUnorderedList {...props} ref={ref} />;
  }
);

UnorderedList.displayName = "UnorderedList";

export const OrderedList = forwardRef<ListProps, "ul">(
  (props: ListProps, ref) => {
    return <ChakraOrderedList {...props} ref={ref} />;
  }
);

OrderedList.displayName = "OrderedList";
