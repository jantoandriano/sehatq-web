import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Badge, BadgeProps } from "..";

export default {
  title: "UI / Badge",
  component: Badge,
} as Meta;

type BadgeStory = StoryObj<BadgeProps>;

export const Basic: BadgeStory = {
  render: (args) => <Badge {...args}>Dikonfirmasi</Badge>,
  args: {
    background: "shamrock.500",
    px: "2.5",
  },
};
