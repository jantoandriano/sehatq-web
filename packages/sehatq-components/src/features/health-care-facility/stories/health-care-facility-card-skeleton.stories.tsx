import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityCardSkeleton,
  HealthCareFacilityCardSkeletonProps,
} from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility Card Skeleton",
  component: HealthCareFacilityCardSkeleton,
} as Meta;

type HealthCareFacilityCardSkeletonStory =
  StoryObj<HealthCareFacilityCardSkeletonProps>;

export const Desktop: HealthCareFacilityCardSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HealthCareFacilityCardSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
