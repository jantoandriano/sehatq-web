import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalFiltersSkeleton,
  HealthCareProfessionalFiltersSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Filters Skeleton",
  component: HealthCareProfessionalFiltersSkeleton,
} as Meta;

type HealthCareProfessionalFiltersSkeletonStory =
  StoryObj<HealthCareProfessionalFiltersSkeletonProps>;

export const Mobile: HealthCareProfessionalFiltersSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalFiltersSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: HealthCareProfessionalFiltersSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalFiltersSkeleton {...args} />
    </Box>
  ),
  args: {},
};
