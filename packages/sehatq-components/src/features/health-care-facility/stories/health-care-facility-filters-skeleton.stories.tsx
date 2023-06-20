import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityFiltersSkeleton,
  HealthCareFacilityFiltersSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Filters Skeleton",
  component: HealthCareFacilityFiltersSkeleton,
} as Meta;

type HealthCareFacilityFiltersSkeletonStory =
  StoryObj<HealthCareFacilityFiltersSkeletonProps>;

export const Desktop: HealthCareFacilityFiltersSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityFiltersSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HealthCareFacilityFiltersSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityFiltersSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
