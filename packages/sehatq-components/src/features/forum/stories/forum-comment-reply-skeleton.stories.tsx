import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ForumCommentReplySkeleton, ForumCommentReplySkeletonProps } from "..";

export default {
  title: "Features / Forum / Forum Comment Reply Skeleton",
  component: ForumCommentReplySkeleton,
} as Meta;

type ForumCommentReplySkeletonStory = StoryObj<ForumCommentReplySkeletonProps>;

export const Mobile: ForumCommentReplySkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ForumCommentReplySkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ForumCommentReplySkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ForumCommentReplySkeleton {...args} />
    </Box>
  ),
  args: {},
};
