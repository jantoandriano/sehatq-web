import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HCFFiltersResultSummarySkeleton,
  HCFFiltersResultSummarySkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Filters Result Summary Skeleton",
  component: HCFFiltersResultSummarySkeleton,
} as Meta;

type HCFFiltersResultSummarySkeletonStory =
  StoryObj<HCFFiltersResultSummarySkeletonProps>;

export const Desktop: HCFFiltersResultSummarySkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HCFFiltersResultSummarySkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: HCFFiltersResultSummarySkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <HCFFiltersResultSummarySkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
