import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, BoxProps } from "..";

export default {
  title: "UI / Box",
  component: Box,
} as Meta;

type BoxStory = StoryObj<BoxProps>;

export const Basic: BoxStory = {
  render: (args) => <Box {...args} />,
  args: {
    background: "blue.500",
    width: "100px",
    height: "100px",
    borderRadius: 4,
  },
};
