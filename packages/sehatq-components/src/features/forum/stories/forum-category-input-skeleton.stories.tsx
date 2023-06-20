import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ForumCategoryInputSkeleton,
  ForumCategoryInputSkeletonProps,
} from "..";

export default {
  title: "Features / Forum / Forum Category Input Skeleton",
  component: ForumCategoryInputSkeleton,
} as Meta;

type ForumCategoryInputSkeletonStory =
  StoryObj<ForumCategoryInputSkeletonProps>;

export const Desktop: ForumCategoryInputSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ForumCategoryInputSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: ForumCategoryInputSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ForumCategoryInputSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
