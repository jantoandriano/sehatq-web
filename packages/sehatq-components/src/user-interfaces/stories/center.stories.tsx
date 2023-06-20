import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Center, CenterProps } from "..";

export default {
  title: "UI / Center",
  component: Center,
} as Meta;

type CenterStory = StoryObj<CenterProps>;

export const Basic: CenterStory = {
  render: (args) => <Center {...args}>Ini tengah</Center>,
  args: {
    background: "blue.500",
    width: "400px",
    height: "400px",
    borderRadius: 4,
  },
};
