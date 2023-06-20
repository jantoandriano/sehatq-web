import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HStack, HStackProps, Box } from "..";

export default {
  title: "UI / Horizontal Stack",
  component: HStack,
} as Meta;

type HStackStory = StoryObj<HStackProps>;

export const Basic: HStackStory = {
  render: (args) => (
    <HStack {...args}>
      <Box width="40px" height="40px" bgColor="main.500" />
      <Box width="40px" height="40px" bgColor="cherry.500" />
      <Box width="40px" height="40px" bgColor="squash.500" />
    </HStack>
  ),
};
