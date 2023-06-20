import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HCPSchedulesCardSkeleton, HCPSchedulesCardSkeletonProps } from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Schedules Card Skeleton",
  component: HCPSchedulesCardSkeleton,
} as Meta;

type HCPSchedulesCardSkeletonStory = StoryObj<HCPSchedulesCardSkeletonProps>;

export const Mobile: HCPSchedulesCardSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HCPSchedulesCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: HCPSchedulesCardSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HCPSchedulesCardSkeleton {...args} isMobile={false} />
    </Box>
  ),
  args: {},
};
