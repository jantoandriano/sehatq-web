import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { TagHeadlineSkeleton, TagHeadlineSkeletonProps } from "..";

export default {
  title: "Features / Tag / Tag Headline Skeleton",
  component: TagHeadlineSkeleton,
} as Meta;

type TagHeadlineSkeletonStory = StoryObj<TagHeadlineSkeletonProps>;

export const Mobile: TagHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <TagHeadlineSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: TagHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <TagHeadlineSkeleton {...args} />
    </Box>
  ),
  args: {},
};
