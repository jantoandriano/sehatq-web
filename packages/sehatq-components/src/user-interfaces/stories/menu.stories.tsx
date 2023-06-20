import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Menu,
  MenuProps,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
  ChevronDownIcon,
} from "..";

export default {
  title: "UI / Menu",
  component: Menu,
} as Meta;

const menus = [
  {
    id: 1,
    name: "David Golliath",
    profileImageUrl: "https://placekitten.com/100/100",
  },
  {
    id: 2,
    name: "Nicole Rania",
    profileImageUrl: "https://placekitten.com/120/120",
  },
];

type MenuStory = StoryObj<MenuProps>;

export const Basic: MenuStory = {
  render: (args) => (
    <>
      <Menu {...args}>
        <MenuButton
          as={Button}
          variant="solid"
          colorScheme="iceBlue"
          color="sea.500"
          rightIcon={<ChevronDownIcon color="main.900" />}
        >
          Semua Keluarga
        </MenuButton>
        <MenuList>
          {menus?.map((menu) => (
            <MenuItem key={menu.id} minH="48px">
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={menu.profileImageUrl}
                alt={menu.name}
                mr="12px"
              />
              <span>{menu.name}</span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  ),
  args: {
    isLazy: true,
  },
};
