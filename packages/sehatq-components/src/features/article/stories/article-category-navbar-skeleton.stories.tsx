import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ArticleCategoryNavbarSkeleton,
  ArticleCategoryNavbarSkeletonProps,
} from "..";

export default {
  title: "Features / Article / Category Navbar Skeleton",
  component: ArticleCategoryNavbarSkeleton,
} as Meta;

type ArticleCategoryNavbarSkeletonStory =
  StoryObj<ArticleCategoryNavbarSkeletonProps>;

export const Mobile: ArticleCategoryNavbarSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleCategoryNavbarSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ArticleCategoryNavbarSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleCategoryNavbarSkeleton {...args} />
    </Box>
  ),
  args: {},
};
