import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HealthToolHeadlineProps, HealthToolHeadlineSkeleton } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Health Tool / Headline Health Tool Skeleton",
  component: HealthToolHeadlineSkeleton,
} as Meta;

type HeadlineStory = StoryObj<HealthToolHeadlineProps>;

export const Desktop: HeadlineStory = {
  render: () => (
    <Box width="1070px">
      <HealthToolHeadlineSkeleton isMobile={false} />
    </Box>
  ),
};

export const Mobile: HeadlineStory = {
  render: () => (
    <Box width="360px" position="relative">
      <HealthToolHeadlineSkeleton isMobile />
    </Box>
  ),
};
