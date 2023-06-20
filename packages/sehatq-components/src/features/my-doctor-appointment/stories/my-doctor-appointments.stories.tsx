import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  MyDoctorAppointments,
  MyDoctorAppointmentsFilters,
  MyDoctorAppointmentsProps,
} from "..";

export default {
  title: "Features / Booking / My Doctor Appointments List",
  component: MyDoctorAppointments,
  subcomponents: { MyDoctorAppointmentsFilters },
} as Meta;

type MyDoctorAppointmentsStory = StoryObj<MyDoctorAppointmentsProps>;

export const Mobile: MyDoctorAppointmentsStory = {
  render: (args) => (
    <Box width="328px">
      <MyDoctorAppointmentsFilters isMobile status={args.status} />
      <MyDoctorAppointments {...args} isMobile />
    </Box>
  ),
  args: {
    status: "all",
  },
};

export const Desktop: MyDoctorAppointmentsStory = {
  render: (args) => (
    <Box width="721px">
      <MyDoctorAppointmentsFilters isMobile={false} status={args.status} />
      <MyDoctorAppointments {...args} isMobile={false} />
    </Box>
  ),
  args: {
    status: "all",
  },
};
