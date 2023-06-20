import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MyDoctorAppointmentReview, MyDoctorAppointmentReviewProps } from "..";

export default {
  title: "Features / Review / My Doctor Appointment Review",
  component: MyDoctorAppointmentReview,
} as Meta;

type MyDoctorAppointmentReviewStory = StoryObj<MyDoctorAppointmentReviewProps>;

export const Desktop: MyDoctorAppointmentReviewStory = {
  render: (args) => (
    <Box width="1366px">
      <MyDoctorAppointmentReview {...args} />
    </Box>
  ),
  args: {
    defaultStep: "time-of-filled",
    bookingId: "BSQ3461",
  },
};

export const Mobile: MyDoctorAppointmentReviewStory = {
  render: (args) => (
    <Box width="360px">
      <MyDoctorAppointmentReview {...args} isMobile />
    </Box>
  ),
  args: {
    defaultStep: "time-of-filled",
    bookingId: "BSQ3461",
  },
};
