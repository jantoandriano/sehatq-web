import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ArticleRatingInputSkeleton,
  ArticleRatingInputSkeletonProps,
} from "..";

export default {
  title: "Features / Article / Rating Input Skeleton",
  component: ArticleRatingInputSkeleton,
} as Meta;

type ArticleRatingInputSkeletonStory =
  StoryObj<ArticleRatingInputSkeletonProps>;

export const Mobile: ArticleRatingInputSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleRatingInputSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ArticleRatingInputSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleRatingInputSkeleton {...args} />
    </Box>
  ),
  args: {},
};
