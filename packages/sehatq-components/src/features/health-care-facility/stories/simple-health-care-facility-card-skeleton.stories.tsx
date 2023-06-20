import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  SimpleHealthCareFacilityCardSkeleton,
  SimpleHealthCareFacilityCardSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Simple Health Care Facility Card Skeleton",
  component: SimpleHealthCareFacilityCardSkeleton,
} as Meta;

type SimpleHealthCareFacilityCardSkeletonStory =
  StoryObj<SimpleHealthCareFacilityCardSkeletonProps>;

export const Desktop: SimpleHealthCareFacilityCardSkeletonStory = {
  render: (args) => (
    <Box width="144px">
      <SimpleHealthCareFacilityCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: SimpleHealthCareFacilityCardSkeletonStory = {
  render: (args) => (
    <Box width="144px">
      <SimpleHealthCareFacilityCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
