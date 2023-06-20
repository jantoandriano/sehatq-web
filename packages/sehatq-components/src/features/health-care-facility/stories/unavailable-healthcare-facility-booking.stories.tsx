import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  UnavailableHealthCareFacilityBookingInfoProps,
  UnavailableHealthCareFacilityBookingInfo,
} from "../unavailable-healthcare-facility-booking";
import { Box } from "../../../user-interfaces";

export default {
  title:
    "Features / Health Care Facility / Unavailable Healthcare Facility Booking",
  component: UnavailableHealthCareFacilityBookingInfo,
} as Meta;

type UnavailableHealthCareFacilityBookingStory =
  StoryObj<UnavailableHealthCareFacilityBookingInfoProps>;

export const Desktop: UnavailableHealthCareFacilityBookingStory = {
  render: (args) => (
    <Box width="1080px">
      <UnavailableHealthCareFacilityBookingInfo {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: UnavailableHealthCareFacilityBookingStory = {
  render: (args) => (
    <Box width="360px">
      <UnavailableHealthCareFacilityBookingInfo {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
