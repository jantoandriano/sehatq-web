import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { InfographicCardSkeleton, InfographicCardSkeletonProps } from "..";

export default {
  title: "Features / Article / Infographic Card Skeleton",
  component: InfographicCardSkeleton,
} as Meta;

type InfographicCardSkeletonStory = StoryObj<InfographicCardSkeletonProps>;

export const Mobile: InfographicCardSkeletonStory = {
  render: (args) => (
    <Box width="150px">
      <InfographicCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: InfographicCardSkeletonStory = {
  render: (args) => (
    <Box width="240px">
      <InfographicCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};
