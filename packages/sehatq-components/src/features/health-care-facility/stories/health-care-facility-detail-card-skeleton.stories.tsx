import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityDetailCardSkeleton,
  HealthCareFacilityDetailCardSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Detail Card Skeleton",
  component: HealthCareFacilityDetailCardSkeleton,
} as Meta;

type HealthCareFacilityDetailCardSkeletonStory =
  StoryObj<HealthCareFacilityDetailCardSkeletonProps>;

export const Desktop: HealthCareFacilityDetailCardSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityDetailCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HealthCareFacilityDetailCardSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityDetailCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
