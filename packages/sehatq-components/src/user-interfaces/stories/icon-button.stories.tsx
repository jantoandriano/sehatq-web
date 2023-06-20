import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArrowBackIcon, IconButton, IconButtonProps } from "..";

export default {
  title: "UI / Icon Button",
  component: IconButton,
} as Meta;

type IconButtonStory = StoryObj<IconButtonProps>;

export const Basic: IconButtonStory = {
  render: (args) => <IconButton {...args} />,
  args: {
    icon: <ArrowBackIcon />,
    colorScheme: "blue",
    variant: "solid",
  },
};
