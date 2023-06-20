import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { CartNavbarMenu } from "..";

export default {
  title: "Features / Cart / Cart Navbar Menu",
  component: CartNavbarMenu,
} as Meta;

type CartNavbarMenuStory = StoryObj<unknown>;

export const Desktop: CartNavbarMenuStory = {
  render: () => (
    <Box width="328px">
      <CartNavbarMenu />
    </Box>
  ),
};
