import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { SimpleForumCardSkeleton, SimpleForumCardSkeletonProps } from "..";

export default {
  title: "Features / Forum / Simple Card Skeleton",
  component: SimpleForumCardSkeleton,
} as Meta;

type SimpleForumCardSkeletonStory = StoryObj<SimpleForumCardSkeletonProps>;

export const Mobile: SimpleForumCardSkeletonStory = {
  render: (args) => (
    <Box width="244px">
      <SimpleForumCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: SimpleForumCardSkeletonStory = {
  render: (args) => (
    <Box width="244px">
      <SimpleForumCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};
