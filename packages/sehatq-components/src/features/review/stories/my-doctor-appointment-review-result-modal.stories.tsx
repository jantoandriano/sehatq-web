import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  MyDoctorAppointmentReviewResultModal,
  MyDoctorAppointmentReviewResultModalProps,
} from "..";

export default {
  title: "Features / Review / My Doctor Appointment Review Result Modal",
  component: MyDoctorAppointmentReviewResultModal,
} as Meta;

type MyDoctorAppointmentReviewResultModalStory =
  StoryObj<MyDoctorAppointmentReviewResultModalProps>;

export const Desktop: MyDoctorAppointmentReviewResultModalStory = {
  render: (args) => (
    <Box width="1366px">
      <MyDoctorAppointmentReviewResultModal {...args} />
    </Box>
  ),
  args: {
    isOpen: true,
    bookingId: "BSQ3461",
  },
};

export const Mobile: MyDoctorAppointmentReviewResultModalStory = {
  render: (args) => (
    <Box width="360px">
      <MyDoctorAppointmentReviewResultModal {...args} isMobile />
    </Box>
  ),
  args: { bookingId: "BSQ3461", isOpen: true },
};
