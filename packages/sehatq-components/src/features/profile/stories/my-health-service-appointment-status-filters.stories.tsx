import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  MyHealthServiceAppointmentStatusFilters,
  MyHealthServiceAppointmentStatusFiltersProps,
} from "..";

export default {
  title: "Features / Profile / My Health Service Appointment Status Filters",
  component: MyHealthServiceAppointmentStatusFilters,
} as Meta;

type MyHealthServiceAppointmentStatusFiltersStory =
  StoryObj<MyHealthServiceAppointmentStatusFiltersProps>;

export const Desktop: MyHealthServiceAppointmentStatusFiltersStory = {
  render: (args) => (
    <Box width="760px" background="white" p={4}>
      <MyHealthServiceAppointmentStatusFilters {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: MyHealthServiceAppointmentStatusFiltersStory = {
  render: (args) => (
    <Box width="320px" background="white" py={4}>
      <MyHealthServiceAppointmentStatusFilters {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
