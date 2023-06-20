import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MyDoctorAppointment, MyDoctorAppointmentProps } from "..";

export default {
  title: "Features / Booking / My Doctor Appointment",
  component: MyDoctorAppointment,
} as Meta;

type MyDoctorAppointmentStory = StoryObj<MyDoctorAppointmentProps>;

export const Desktop: MyDoctorAppointmentStory = {
  render: (args) => (
    <Box width="720px">
      <MyDoctorAppointment {...args} />
    </Box>
  ),
  args: {
    bookingId: "BSQ25392",
  },
};

export const Mobile: MyDoctorAppointmentStory = {
  render: (args) => (
    <Box width="328px">
      <MyDoctorAppointment {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    bookingId: "BSQ25392",
  },
};
