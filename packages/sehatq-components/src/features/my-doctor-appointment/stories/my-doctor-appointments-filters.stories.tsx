import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  MyDoctorAppointmentsFilters,
  MyDoctorAppointmentsFiltersProps,
} from "..";

export default {
  title: "Features / Booking / My Doctor Appointments Filter",
  component: MyDoctorAppointmentsFilters,
} as Meta;

type MyDoctorAppointmentsFiltersStory =
  StoryObj<MyDoctorAppointmentsFiltersProps>;

export const Mobile: MyDoctorAppointmentsFiltersStory = {
  render: (args) => (
    <Box width="328px">
      <MyDoctorAppointmentsFilters {...args} isMobile />
    </Box>
  ),
};

export const Desktop: MyDoctorAppointmentsFiltersStory = {
  render: (args) => (
    <Box width="760px">
      <MyDoctorAppointmentsFilters {...args} />
    </Box>
  ),
};
