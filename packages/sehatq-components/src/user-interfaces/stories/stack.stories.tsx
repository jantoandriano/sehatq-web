import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Stack, StackDivider, StackProps, Box } from "..";

export default {
  title: "UI / Stack",
  component: Stack,
} as Meta;

type StackStory = StoryObj<StackProps>;

export const Row: StackStory = {
  render: (args) => (
    <Stack {...args}>
      <Box width="40px" height="40px" bgColor="main.500" />
      <Box width="40px" height="40px" bgColor="cherry.500" />
      <Box width="40px" height="40px" bgColor="squash.500" />
    </Stack>
  ),
  args: {
    direction: "row",
  },
};

export const Column: StackStory = {
  ...Row,
  args: {
    direction: "column",
  },
};

export const WithDivider: StackStory = {
  ...Row,
  args: {
    direction: "column",
    divider: <StackDivider borderColor="main.900" />,
  },
};
