import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ArticlesSectionSkeleton,
  ArticlesSectionSkeletonProps,
} from "../articles-section";

export default {
  title: "Features / Tag / Articles Section Skeleton",
  component: ArticlesSectionSkeleton,
} as Meta;

type ArticlesSectionSkeletonStory = StoryObj<ArticlesSectionSkeletonProps>;

export const Desktop: ArticlesSectionSkeletonStory = {
  render: (args) => (
    <Box width="352px">
      <ArticlesSectionSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: ArticlesSectionSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <ArticlesSectionSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
