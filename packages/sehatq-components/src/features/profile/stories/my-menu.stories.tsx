import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MyMenuProps, MyMenu } from "../my-menu";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Menu",
  component: MyMenu,
} as Meta;

type MyMenuStory = StoryObj<MyMenuProps>;

export const Desktop: MyMenuStory = {
  render: (args) => (
    <Box width="330px" p={4} background="iceBlue.500">
      <MyMenu {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: MyMenuStory = {
  ...Desktop,
  args: {
    isMobile: true,
  },
};
