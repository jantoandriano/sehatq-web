import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Empty, EmptyProps } from "..";

export default {
  title: "Features / General / Empty",
  component: Empty,
} as Meta;

type EmptyStory = StoryObj<EmptyProps>;

export const Desktop: EmptyStory = {
  render: (args) => <Empty {...args} />,
  args: {
    isMobile: false,
  },
};

export const Mobile: EmptyStory = {
  render: (args) => <Empty {...args} />,
  args: {
    isMobile: true,
  },
};
