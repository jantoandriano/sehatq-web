import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicBooking,
  InternistClinicBookingProps,
} from "../internist-clinic-booking";

export default {
  title: "Features / Landing Page / Internist Clinic Booking",
  component: InternistClinicBooking,
} as Meta;

type InternistClinicBookingStory = StoryObj<InternistClinicBookingProps>;
export const Desktop: InternistClinicBookingStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicBooking {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicBookingStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicBooking {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
