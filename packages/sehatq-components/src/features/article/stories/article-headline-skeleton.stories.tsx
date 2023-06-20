import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleHeadlineSkeleton, ArticleHeadlineSkeletonProps } from "..";

export default {
  title: "Features / Article / Headline Skeleton",
  component: ArticleHeadlineSkeleton,
} as Meta;

type ArticleHeadlineSkeletonStory = StoryObj<ArticleHeadlineSkeletonProps>;

export const Mobile: ArticleHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleHeadlineSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ArticleHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleHeadlineSkeleton {...args} />
    </Box>
  ),
  args: {},
};
