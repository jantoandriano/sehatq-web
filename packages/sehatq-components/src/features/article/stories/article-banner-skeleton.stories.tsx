import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleBannerSkeleton, ArticleBannerSkeletonProps } from "..";

export default {
  title: "Features / Article / Banner Skeleton",
  component: ArticleBannerSkeleton,
} as Meta;

type ArticleBannerSkeletonStory = StoryObj<ArticleBannerSkeletonProps>;

export const Desktop: ArticleBannerSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleBannerSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: ArticleBannerSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <ArticleBannerSkeleton {...args} isMobile />
    </Box>
  ),
};
