import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, Flex, FlexProps } from "..";

export default {
  title: "UI / Flex",
  component: Flex,
} as Meta;

type FlexStory = StoryObj<FlexProps>;

export const Basic: FlexStory = {
  render: (args) => <Flex {...args} />,
  args: {
    children: (
      <Box width="60px" height="60px" background="blue.100" borderRadius={2} />
    ),
    background: "blue.500",
    width: "100px",
    height: "100px",
    borderRadius: 4,
    align: "center",
    justify: "center",
  },
};
