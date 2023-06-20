import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityServicesSkeleton,
  HealthCareFacilityServicesSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Services Skeleton",
  component: HealthCareFacilityServicesSkeleton,
} as Meta;

type HealthCareFacilityServicesSkeletonStory =
  StoryObj<HealthCareFacilityServicesSkeletonProps>;

export const Desktop: HealthCareFacilityServicesSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityServicesSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HealthCareFacilityServicesSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <HealthCareFacilityServicesSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
