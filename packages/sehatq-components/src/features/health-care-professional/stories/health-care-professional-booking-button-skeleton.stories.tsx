import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HCPBookingButtonSkeleton, HCPBookingButtonSkeletonProps } from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Booking Button Skeleton",
  component: HCPBookingButtonSkeleton,
} as Meta;

type HCPBookingButtonSkeletonStory = StoryObj<HCPBookingButtonSkeletonProps>;

export const Mobile: HCPBookingButtonSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <HCPBookingButtonSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: HCPBookingButtonSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <HCPBookingButtonSkeleton {...args} />
    </Box>
  ),
  args: {},
};
