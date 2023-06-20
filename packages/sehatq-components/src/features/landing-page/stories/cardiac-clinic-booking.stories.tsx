import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  CardiacClinicBooking,
  CardiacClinicBookingProps,
} from "../cardiac-clinic-booking";

export default {
  title: "Features / Landing Page / Cardiac Clinic Booking",
  component: CardiacClinicBooking,
} as Meta;

type CardiacClinicBookingStory = StoryObj<CardiacClinicBookingProps>;
export const Desktop: CardiacClinicBookingStory = {
  render: (args) => (
    <Box width="1160px">
      <CardiacClinicBooking {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: CardiacClinicBookingStory = {
  render: (args) => (
    <Box width="360px">
      <CardiacClinicBooking {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
