import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  MyDoctorAppointmentReviewModal,
  MyDoctorAppointmentReviewModalProps,
} from "..";

export default {
  title: "Features / Review / My Doctor Appointment Review Modal",
  component: MyDoctorAppointmentReviewModal,
} as Meta;

type MyDoctorAppointmentReviewModalStory =
  StoryObj<MyDoctorAppointmentReviewModalProps>;

export const Desktop: MyDoctorAppointmentReviewModalStory = {
  render: (args) => (
    <Box width="1366px">
      <MyDoctorAppointmentReviewModal {...args} />
    </Box>
  ),
  args: {
    isOpen: true,
    onClose: console.log,
    title: "RS Mitra Keluarga Jakarta",
    imageSrc: "/",
    description: "CT Scan Nasofaring (Kontras/Tanpa)",
  },
};

export const Mobile: MyDoctorAppointmentReviewModalStory = {
  render: (args) => (
    <Box width="360px">
      <MyDoctorAppointmentReviewModal {...args} isMobile />
    </Box>
  ),
  args: {
    isOpen: true,
    onClose: console.log,
    title: "RS Mitra Keluarga Jakarta",
    imageSrc: "/",
    description: "CT Scan Nasofaring (Kontras/Tanpa)",
  },
};
