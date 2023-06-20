import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityFeaturesSkeleton,
  HealthCareFacilityFeaturesSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Features Skeleton",
  component: HealthCareFacilityFeaturesSkeleton,
} as Meta;

type HealthCareFacilityFeaturesSkeletonStory =
  StoryObj<HealthCareFacilityFeaturesSkeletonProps>;

export const Desktop: HealthCareFacilityFeaturesSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityFeaturesSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HealthCareFacilityFeaturesSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityFeaturesSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
