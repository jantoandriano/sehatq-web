import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MyHealthServiceAppointmentsProps,
  MyHealthServiceAppointments,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Health Service Appointments",
  component: MyHealthServiceAppointments,
} as Meta;

type MyHealthServiceAppointmentsStory =
  StoryObj<MyHealthServiceAppointmentsProps>;

export const Desktop: MyHealthServiceAppointmentsStory = {
  render: (args) => (
    <Box width="760px" p={5} background="iceBlue.500">
      <MyHealthServiceAppointments {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: MyHealthServiceAppointmentsStory = {
  render: (args) => (
    <Box width="360px" height="500px" px={5} background="iceBlue.500">
      <MyHealthServiceAppointments {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
