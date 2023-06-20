import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";

import {
  ClinicBookingSkeleton,
  ClinicBookingSkeletonProps,
} from "../clinic-booking";

export default {
  title: "Features / Landing Page / Clinic Booking Skeleton",
  component: ClinicBookingSkeleton,
} as Meta;

type ClinicBookingStory = StoryObj<ClinicBookingSkeletonProps>;

export const Desktop: ClinicBookingStory = {
  render: (args) => (
    <Box width="1160px">
      <ClinicBookingSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: ClinicBookingStory = {
  render: (args) => (
    <Box width="328px">
      <ClinicBookingSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
