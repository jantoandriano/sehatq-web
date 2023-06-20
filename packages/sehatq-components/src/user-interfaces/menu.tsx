import React from "react";
import {
  Menu as ChakraMenu,
  MenuProps as ChakraMenuProps,
  MenuButton as ChakraMenuButton,
  MenuButtonProps as ChakraMenuButtonProps,
  MenuList as ChakraMenuList,
  MenuListProps as ChakraMenuListProps,
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
  MenuDivider as ChakraMenuDivider,
  MenuDividerProps as ChakraMenuDividerProps,
  MenuOptionGroup as ChakraMenuOptionGroup,
  MenuOptionGroupProps as ChakraMenuOptionGroupProps,
  MenuItemOption as ChakraMenuItemOption,
  MenuItemOptionProps as ChakraMenuItemOptionProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type MenuProps = StripChakraProps<ChakraMenuProps>;
export const Menu = (props: MenuProps) => {
  return <ChakraMenu {...props} />;
};
Menu.displayName = "Menu";

export type MenuButtonProps = StripChakraProps<ChakraMenuButtonProps>;
export const MenuButton = ChakraMenuButton;
MenuButton.displayName = "MenuButton";

export type MenuListProps = StripChakraProps<ChakraMenuListProps>;
export const MenuList = forwardRef<MenuListProps, "div">(
  (props: MenuListProps, ref) => {
    return <ChakraMenuList {...props} ref={ref} />;
  }
);
MenuList.displayName = "MenuList";

export type MenuItemProps = StripChakraProps<ChakraMenuItemProps>;
export const MenuItem = forwardRef<MenuItemProps, "div">(
  (props: MenuItemProps, ref) => {
    return <ChakraMenuItem {...props} ref={ref} />;
  }
);
MenuItem.displayName = "MenuItem";

export type MenuDividerProps = StripChakraProps<ChakraMenuDividerProps>;
export const MenuDivider = (props: MenuDividerProps) => {
  return <ChakraMenuDivider {...props} />;
};
MenuDivider.displayName = "MenuDivider";

export type MenuOptionGroupProps = StripChakraProps<ChakraMenuOptionGroupProps>;
export const MenuOptionGroup = (props: MenuOptionGroupProps) => {
  return <ChakraMenuOptionGroup {...props} />;
};
MenuOptionGroup.displayName = "MenuOptionGroup";

export type MenuItemOptionProps = StripChakraProps<ChakraMenuItemOptionProps>;
export const MenuItemOption = (props: MenuItemOptionProps) => {
  return <ChakraMenuItemOption {...props} />;
};
MenuItemOption.displayName = "MenuItemOption";
