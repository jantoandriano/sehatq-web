import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { VStack, VStackProps, Box } from "..";

export default {
  title: "UI / Vertical Stack",
  component: VStack,
} as Meta;

type VStackStory = StoryObj<VStackProps>;

export const Basic: VStackStory = {
  render: (args) => (
    <VStack {...args}>
      <Box width="40px" height="40px" bgColor="main.500" />
      <Box width="40px" height="40px" bgColor="cherry.500" />
      <Box width="40px" height="40px" bgColor="squash.500" />
    </VStack>
  ),
};
