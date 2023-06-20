import React, { Fragment } from "react";
import { List, ListItem } from "./list";
import { ListIcon } from "./icons";

export interface ListGroupItem {
  id: string;
  label: string;
}

export interface ListGroupProps<Item extends ListGroupItem = ListGroupItem> {
  list: Array<Item>;
  activeItems: Array<ListGroupItem["id"]>;
  onClick: (item: Item) => void;
}

export function ListGroup<Item extends ListGroupItem = ListGroupItem>({
  list,
  activeItems,
  onClick,
}: ListGroupProps<Item>) {
  return (
    <List>
      {list.map((item, index) => {
        const isActive = activeItems && activeItems.includes(item.id);
        return (
          <Fragment key={item.id}>
            <ListItem
              fontSize="sm"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py={3}
              onClick={() => onClick(item)}
              {...(list.length > index + 1 && {
                borderBottom: "0.5px solid #dadada",
              })}
              {...(isActive && {
                color: "sea.500",
                fontWeight: "semibold",
              })}
              cursor="pointer"
            >
              {item.label}
              {isActive ? <ListIcon boxSize={5} /> : null}
            </ListItem>
          </Fragment>
        );
      })}
    </List>
  );
}
