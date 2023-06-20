import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { HealthToolListContent, HealthToolListContentProps } from "..";
export default {
  title: "Features / Health Tool / Health Tool List Content",
  component: HealthToolListContent,
} as Meta;

type HealthToolListContentStory = StoryObj<HealthToolListContentProps>;

export const Desktop: HealthToolListContentStory = {
  render: (args) => (
    <Box width="750px">
      <HealthToolListContent {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HealthToolListContentStory = {
  render: (args) => (
    <Box width="360px">
      <HealthToolListContent {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
