import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MyHealthServiceAppointmentProps,
  MyHealthServiceAppointment,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Health Service Appointment",
  component: MyHealthServiceAppointment,
} as Meta;

type MyHealthServiceAppointmentStory =
  StoryObj<MyHealthServiceAppointmentProps>;

export const Desktop: MyHealthServiceAppointmentStory = {
  render: (args) => (
    <Box width="760px" p={5} background="iceBlue.500">
      <MyHealthServiceAppointment {...args} />
    </Box>
  ),
  args: { bookingId: "1027" },
};

export const Mobile: MyHealthServiceAppointmentStory = {
  render: (args) => (
    <Box width="360px" minHeight="500px" p={5} background="iceBlue.500">
      <MyHealthServiceAppointment {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
