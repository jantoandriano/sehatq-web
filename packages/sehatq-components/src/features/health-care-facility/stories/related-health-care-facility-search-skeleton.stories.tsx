import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  RelatedHealthCareFacilitySearchSkeleton,
  RelatedHealthCareFacilitySearchSkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Related Health Care Facility Search Skeleton",
  component: RelatedHealthCareFacilitySearchSkeleton,
} as Meta;

type RelatedHealthCareFacilitySearchSkeletonStory =
  StoryObj<RelatedHealthCareFacilitySearchSkeletonProps>;

export const Desktop: RelatedHealthCareFacilitySearchSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <RelatedHealthCareFacilitySearchSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: RelatedHealthCareFacilitySearchSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <RelatedHealthCareFacilitySearchSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
