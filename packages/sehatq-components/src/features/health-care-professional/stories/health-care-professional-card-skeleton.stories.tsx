import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalCardSkeleton,
  HealthCareProfessionalCardSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Card Skeleton",
  component: HealthCareProfessionalCardSkeleton,
} as Meta;

type HealthCareProfessionalCardSkeletonStory =
  StoryObj<HealthCareProfessionalCardSkeletonProps>;

export const Mobile: HealthCareProfessionalCardSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: HealthCareProfessionalCardSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};
