import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityHorizontalListSkeleton,
  HealthCareFacilityHorizontalListSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Horizontal List Skeleton",
  component: HealthCareFacilityHorizontalListSkeleton,
} as Meta;

type HealthCareFacilityHorizontalListSkeletonStory =
  StoryObj<HealthCareFacilityHorizontalListSkeletonProps>;

export const Desktop: HealthCareFacilityHorizontalListSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityHorizontalListSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HealthCareFacilityHorizontalListSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <HealthCareFacilityHorizontalListSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
