import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleCardSkeleton, ArticleCardSkeletonProps } from "..";

export default {
  title: "Features / Article / Card Skeleton",
  component: ArticleCardSkeleton,
} as Meta;

type ArticleCardSkeletonStory = StoryObj<ArticleCardSkeletonProps>;

export const Mobile: ArticleCardSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ArticleCardSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};
