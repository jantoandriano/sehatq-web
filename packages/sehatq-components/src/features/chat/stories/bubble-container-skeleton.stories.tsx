import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { BubbleContainerSkeleton, BubbleContainerSkeletonProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Chat / Bubble Container Skeleton",
  component: BubbleContainerSkeleton,
} as Meta;

type BubbleContainerSkeletonStory = StoryObj<BubbleContainerSkeletonProps>;

export const Desktop: BubbleContainerSkeletonStory = {
  render: (args) => (
    <Box maxW="445px">
      <BubbleContainerSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: BubbleContainerSkeletonStory = {
  render: (args) => (
    <Box maxW="273px">
      <BubbleContainerSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
