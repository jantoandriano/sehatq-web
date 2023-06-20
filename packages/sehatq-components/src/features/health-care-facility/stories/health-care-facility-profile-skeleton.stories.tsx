import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityProfileSkeleton,
  HealthCareFacilityProfileSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Profile Skeleton",
  component: HealthCareFacilityProfileSkeleton,
} as Meta;

type HealthCareFacilityProfileSkeletonStory =
  StoryObj<HealthCareFacilityProfileSkeletonProps>;

export const Desktop: HealthCareFacilityProfileSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityProfileSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HealthCareFacilityProfileSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityProfileSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
