import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { EmptyMyDoctorAppointments, EmptyMyDoctorAppointmentsProps } from "..";

export default {
  title: "Features / Booking / Empty My Doctor Appointments",
  component: EmptyMyDoctorAppointments,
} as Meta;

type EmptyMyDoctorAppointmentsStory = StoryObj<EmptyMyDoctorAppointmentsProps>;

export const Mobile: EmptyMyDoctorAppointmentsStory = {
  render: (args) => (
    <Box width="328px">
      <EmptyMyDoctorAppointments {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: EmptyMyDoctorAppointmentsStory = {
  render: (args) => (
    <Box width="760px">
      <EmptyMyDoctorAppointments {...args} />
    </Box>
  ),
  args: {},
};
