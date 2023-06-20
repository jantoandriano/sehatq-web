import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HCPProfileContentSkeleton, HCPProfileContentSkeletonProps } from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Profile Content Skeleton",
  component: HCPProfileContentSkeleton,
} as Meta;

type HCPProfileContentSkeletonStory = StoryObj<HCPProfileContentSkeletonProps>;

export const Mobile: HCPProfileContentSkeletonStory = {
  render: () => (
    <Box width="328px">
      <HCPProfileContentSkeleton isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: HCPProfileContentSkeletonStory = {
  render: () => (
    <Box width="760px">
      <HCPProfileContentSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};
