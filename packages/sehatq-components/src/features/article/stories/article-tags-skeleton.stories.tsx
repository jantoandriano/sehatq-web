import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleTagsSkeleton, ArticleTagsSkeletonProps } from "..";

export default {
  title: "Features / Article / Tags Skeleton",
  component: ArticleTagsSkeleton,
} as Meta;

type ArticleTagsSkeletonStory = StoryObj<ArticleTagsSkeletonProps>;

export const Mobile: ArticleTagsSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleTagsSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ArticleTagsSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleTagsSkeleton {...args} />
    </Box>
  ),
  args: {},
};
