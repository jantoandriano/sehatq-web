import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MyAppointmentCancelation, MyAppointmentCancelationProps } from "../";

export default {
  title: "Features / Profile / My Appointment Cancelation",
  component: MyAppointmentCancelation,
} as Meta;

type CancelationReasonsStory = StoryObj<MyAppointmentCancelationProps>;

export const Desktop: CancelationReasonsStory = {
  render: (args) => (
    <Box width="410px">
      <MyAppointmentCancelation {...args} />
    </Box>
  ),
  args: {
    onConfirmCancelationReason: console.log,
  },
};

export const Mobile: CancelationReasonsStory = {
  render: (args) => (
    <Box width="360px">
      <MyAppointmentCancelation {...args} isMobile />
    </Box>
  ),
  args: {
    onConfirmCancelationReason: console.log,
  },
};
