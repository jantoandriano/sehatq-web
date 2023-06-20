import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  MyDoctorAppointmentExpiredReview,
  MyDoctorAppointmentExpiredReviewProps,
} from "..";

export default {
  title: "Features / Booking / My Doctor Appointment Expired Review",
  component: MyDoctorAppointmentExpiredReview,
} as Meta;

type MyDoctorAppointmentExpiredReviewStory =
  StoryObj<MyDoctorAppointmentExpiredReviewProps>;

export const Desktop: MyDoctorAppointmentExpiredReviewStory = {
  render: (args) => (
    <Box width="760px">
      <MyDoctorAppointmentExpiredReview {...args} />
    </Box>
  ),
  args: {
    date: "2022-03-01",
  },
};

export const Mobile: MyDoctorAppointmentExpiredReviewStory = {
  render: (args) => (
    <Box width="328px">
      <MyDoctorAppointmentExpiredReview {...args} isMobile />
    </Box>
  ),
  args: {
    ...Desktop.args,
  },
};
