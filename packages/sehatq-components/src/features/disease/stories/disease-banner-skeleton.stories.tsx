import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  DiseaseBannerSkeleton,
  DiseaseBannerSkeletonProps,
} from "../disease-banner";

export default {
  title: "Features / Disease / Banner Skeleton",
  component: DiseaseBannerSkeleton,
} as Meta;

type DiseaseBannerSkeletonStory = StoryObj<DiseaseBannerSkeletonProps>;

export const Desktop: DiseaseBannerSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseBannerSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: DiseaseBannerSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <DiseaseBannerSkeleton {...args} isMobile />
    </Box>
  ),
};
