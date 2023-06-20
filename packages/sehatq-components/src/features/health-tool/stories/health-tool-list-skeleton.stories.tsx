import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HealthToolListSkeleton, HealthToolListSkeletonProps } from "..";

export default {
  title: "Features / Health Tool / Health Tool List Skeleton",
  component: HealthToolListSkeleton,
} as Meta;

type HealthToolListSkeletonStory = StoryObj<HealthToolListSkeletonProps>;

export const Desktop: HealthToolListSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthToolListSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: HealthToolListSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthToolListSkeleton {...args} isMobile />
    </Box>
  ),
};
