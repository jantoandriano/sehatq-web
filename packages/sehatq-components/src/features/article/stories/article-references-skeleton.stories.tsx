import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleReferencesSkeleton, ArticleReferencesSkeletonProps } from "..";

export default {
  title: "Features / Article / References Skeleton",
  component: ArticleReferencesSkeleton,
} as Meta;

type ArticleReferencesSkeletonStory = StoryObj<ArticleReferencesSkeletonProps>;

export const Mobile: ArticleReferencesSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleReferencesSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ArticleReferencesSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleReferencesSkeleton {...args} />
    </Box>
  ),
  args: {},
};
