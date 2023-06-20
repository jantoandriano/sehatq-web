import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";

import {
  PediatricClinicBooking,
  PediatricClinicBookingProps,
} from "../pediatric-clinic-booking";

export default {
  title: "Features / Landing Page / Pediatric Clinic Booking",
  component: PediatricClinicBooking,
} as Meta;

type PediatricClinicBookingStory = StoryObj<PediatricClinicBookingProps>;

export const Desktop: PediatricClinicBookingStory = {
  render: (args) => (
    <Box width="1160px">
      <PediatricClinicBooking {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: PediatricClinicBookingStory = {
  render: (args) => (
    <Box width="350px">
      <PediatricClinicBooking {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
