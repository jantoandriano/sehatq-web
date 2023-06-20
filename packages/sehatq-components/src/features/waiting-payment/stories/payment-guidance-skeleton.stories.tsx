import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PaymentGuidanceSkeleton,
  PaymentGuidanceDesktopSkeletonProps,
} from "../payment-guidance";

export default {
  title: "Features / Waiting Payment / Payment Guidance Skeleton",
  component: PaymentGuidanceSkeleton,
} as Meta;

type PaymentGuidanceSkeletonStory =
  StoryObj<PaymentGuidanceDesktopSkeletonProps>;

export const Desktop: PaymentGuidanceSkeletonStory = {
  render: (args) => (
    <Box width="834px">
      <PaymentGuidanceSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: PaymentGuidanceSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <PaymentGuidanceSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
