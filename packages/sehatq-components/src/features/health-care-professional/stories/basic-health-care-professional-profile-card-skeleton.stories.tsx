import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  BasicHCPProfileCardSkeleton,
  BasicHCPProfileCardSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Basic Health Care Professional Profile Card Skeleton",
  component: BasicHCPProfileCardSkeleton,
} as Meta;

type BasicHCPProfileCardSkeletonStory =
  StoryObj<BasicHCPProfileCardSkeletonProps>;

export const Mobile: BasicHCPProfileCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <BasicHCPProfileCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: BasicHCPProfileCardSkeletonStory = {
  render: () => (
    <Box width="760px">
      <BasicHCPProfileCardSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};
