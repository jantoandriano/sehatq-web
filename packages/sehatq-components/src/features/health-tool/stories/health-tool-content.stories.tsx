import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { HealthToolContent, HealthToolContentProps } from "..";
export default {
  title: "Features / Health Tool / Health Tool Content",
  component: HealthToolContent,
} as Meta;

type HealthToolContentStory = StoryObj<HealthToolContentProps>;

export const Desktop: HealthToolContentStory = {
  render: (args) => (
    <Box width="750px">
      <HealthToolContent {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HealthToolContentStory = {
  render: (args) => (
    <Box width="360px">
      <HealthToolContent {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
