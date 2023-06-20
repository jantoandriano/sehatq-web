import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { SimpleArticleCardSkeleton, SimpleArticleCardSkeletonProps } from "..";

export default {
  title: "Features / Article / Simple Card Skeleton",
  component: SimpleArticleCardSkeleton,
} as Meta;

type SimpleArticleCardSkeletonStory = StoryObj<SimpleArticleCardSkeletonProps>;

export const Mobile: SimpleArticleCardSkeletonStory = {
  render: (args) => (
    <Box width="144px">
      <SimpleArticleCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: SimpleArticleCardSkeletonStory = {
  render: (args) => (
    <Box width="144px">
      <SimpleArticleCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};
