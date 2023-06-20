import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ForumCommentSkeleton, ForumCommentSkeletonProps } from "..";

export default {
  title: "Features / Forum / Forum Comment Skeleton",
  component: ForumCommentSkeleton,
} as Meta;

type ForumCommentSkeletonStory = StoryObj<ForumCommentSkeletonProps>;

export const Mobile: ForumCommentSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ForumCommentSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ForumCommentSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ForumCommentSkeleton {...args} />
    </Box>
  ),
  args: {},
};
