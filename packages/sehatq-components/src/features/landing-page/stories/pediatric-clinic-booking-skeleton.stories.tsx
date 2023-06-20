import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";

import {
  PediatricClinicBookingSkeleton,
  PediatricClinicBookingSkeletonProps,
} from "../pediatric-clinic-booking";

export default {
  title: "Features / Landing Page / Pediatric Clinic Booking Skeleton",
  component: PediatricClinicBookingSkeleton,
} as Meta;

type PediatricClinicBookingStory =
  StoryObj<PediatricClinicBookingSkeletonProps>;

export const Desktop: PediatricClinicBookingStory = {
  render: (args) => (
    <Box width="1160px">
      <PediatricClinicBookingSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: PediatricClinicBookingStory = {
  render: (args) => (
    <Box width="328px">
      <PediatricClinicBookingSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
