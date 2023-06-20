import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MyEmptyHealthServiceAppointmentProps,
  MyEmptyHealthServiceAppointment,
} from "../my-empty-health-service-appointment";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Empty Health Service Appointment",
  component: MyEmptyHealthServiceAppointment,
} as Meta;

type MyEmptyHealthServiceAppointmentStory =
  StoryObj<MyEmptyHealthServiceAppointmentProps>;

export const Desktop: MyEmptyHealthServiceAppointmentStory = {
  render: (args) => (
    <Box width="500px" background="iceBlue.500" pb={10}>
      <MyEmptyHealthServiceAppointment {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: MyEmptyHealthServiceAppointmentStory = {
  render: (args) => (
    <Box width="360px" height="500px" background="iceBlue.500" pb={10} px={4}>
      <MyEmptyHealthServiceAppointment {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
