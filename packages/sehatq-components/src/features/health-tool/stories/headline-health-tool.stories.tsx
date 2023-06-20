import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HealthToolHeadline, HealthToolHeadlineProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Health Tool / Headline Health Tool",
  component: HealthToolHeadline,
} as Meta;

type HeadlineStory = StoryObj<HealthToolHeadlineProps>;

export const Desktop: HeadlineStory = {
  render: (args) => (
    <Box width="1070px">
      <HealthToolHeadline {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    slug: "test-sembilan-edit",
  },
};

export const Mobile: HeadlineStory = {
  render: (args) => (
    <Box width="360px" position="relative">
      <HealthToolHeadline {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    slug: "test-sembilan-edit",
  },
};
