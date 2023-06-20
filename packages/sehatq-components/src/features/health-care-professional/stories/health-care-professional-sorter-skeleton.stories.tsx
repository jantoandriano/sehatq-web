import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalSorterSkeleton,
  HealthCareProfessionalSorterSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Sorter Skeleton",
  component: HealthCareProfessionalSorterSkeleton,
} as Meta;

type HealthCareProfessionalSorterSkeletonStory =
  StoryObj<HealthCareProfessionalSorterSkeletonProps>;

export const Mobile: HealthCareProfessionalSorterSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalSorterSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: HealthCareProfessionalSorterSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalSorterSkeleton {...args} />
    </Box>
  ),
  args: {},
};
