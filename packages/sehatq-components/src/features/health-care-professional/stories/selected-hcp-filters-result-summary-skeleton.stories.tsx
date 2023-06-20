import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  SelectedHCPFiltersResultSummarySkeleton,
  SelectedHCPFiltersResultSummarySkeletonProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Selected Health Care Professional Filter Result Summary Skeleton",
  component: SelectedHCPFiltersResultSummarySkeleton,
} as Meta;

type SelectedHCPFiltersResultSummarySkeletonStory =
  StoryObj<SelectedHCPFiltersResultSummarySkeletonProps>;

export const Mobile: SelectedHCPFiltersResultSummarySkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <SelectedHCPFiltersResultSummarySkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: SelectedHCPFiltersResultSummarySkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <SelectedHCPFiltersResultSummarySkeleton {...args} />
    </Box>
  ),
  args: {},
};
