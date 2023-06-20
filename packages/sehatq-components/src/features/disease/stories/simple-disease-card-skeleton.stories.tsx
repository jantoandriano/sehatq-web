import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  SimpleDiseaseCardSkeleton,
  SimpleDiseaseCardSkeletonProps,
} from "../simple-disease-card";

export default {
  title: "Features / Disease / Simple Disease Card Skeleton",
  component: SimpleDiseaseCardSkeleton,
} as Meta;

type SimpleDiseaseCardSkeletonStory = StoryObj<SimpleDiseaseCardSkeletonProps>;

export const Mobile: SimpleDiseaseCardSkeletonStory = {
  render: (args) => (
    <Box width="130px">
      <SimpleDiseaseCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: SimpleDiseaseCardSkeletonStory = {
  render: (args) => (
    <Box width="174px">
      <SimpleDiseaseCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};
