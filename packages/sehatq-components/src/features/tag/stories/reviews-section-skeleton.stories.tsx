import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ReviewsSectionSkeleton,
  ReviewsSectionSkeletonProps,
} from "../reviews-section";

export default {
  title: "Features / Tag / Reviews Section Skeleton",

  component: ReviewsSectionSkeleton,
} as Meta;

type ReviewsSectionSkeletonStory = StoryObj<ReviewsSectionSkeletonProps>;

export const Desktop: ReviewsSectionSkeletonStory = {
  render: (args) => (
    <Box width="352px">
      <ReviewsSectionSkeleton {...args} />
    </Box>
  ),

  args: {},
};

export const Mobile: ReviewsSectionSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <ReviewsSectionSkeleton {...args} isMobile />
    </Box>
  ),

  args: {},
};
