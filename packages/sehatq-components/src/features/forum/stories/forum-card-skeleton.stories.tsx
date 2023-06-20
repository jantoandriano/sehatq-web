import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ForumCardSkeleton, ForumCardSkeletonProps } from "..";

export default {
  title: "Features / Forum / Forum Card Skeleton",
  component: ForumCardSkeleton,
} as Meta;

type ForumCardSkeletonStory = StoryObj<ForumCardSkeletonProps>;

export const Desktop: ForumCardSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ForumCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: ForumCardSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ForumCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
