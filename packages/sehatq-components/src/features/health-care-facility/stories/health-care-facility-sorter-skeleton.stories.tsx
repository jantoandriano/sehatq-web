import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilitySorterSkeleton,
  HealthCareFacilitySorterSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Sorter Skeleton",
  component: HealthCareFacilitySorterSkeleton,
} as Meta;

type HealthCareFacilitySorterSkeletonStory =
  StoryObj<HealthCareFacilitySorterSkeletonProps>;

export const Mobile: HealthCareFacilitySorterSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilitySorterSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: HealthCareFacilitySorterSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilitySorterSkeleton {...args} />
    </Box>
  ),
  args: {},
};
