import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";

import { ClinicBooking, ClinicBookingProps } from "../clinic-booking";

export default {
  title: "Features / Landing Page / Clinic Booking",
  component: ClinicBooking,
} as Meta;

type ClinicBookingStory = StoryObj<ClinicBookingProps>;

export const Desktop: ClinicBookingStory = {
  render: (args) => (
    <Box width="1160px">
      <ClinicBooking {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    title: "Booking Dokter di Mana Saja, Kapan Saja",
    bookingsNavigation: {
      name: "HEALTH_CARE_PROFESIONAL",
      query: {
        slugs: ["anak"],
      },
    },
    specialitySlug: "",
  },
};

export const Mobile: ClinicBookingStory = {
  render: (args) => (
    <Box width="350px">
      <ClinicBooking {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    title: "Booking Dokter di Mana Saja, Kapan Saja",
    specialitySlug: "",
  },
};
