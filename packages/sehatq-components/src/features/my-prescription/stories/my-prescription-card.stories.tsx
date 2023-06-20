import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MyPrescriptionCard, MyPrescriptionCardProps } from "..";

export default {
  title: "Features / My Prescription / My Prescription Card",
  component: MyPrescriptionCard,
} as Meta;

type MyPrescriptionCardStory = StoryObj<MyPrescriptionCardProps>;

export const Desktop: MyPrescriptionCardStory = {
  render: (args) => (
    <Box width="722px">
      <MyPrescriptionCard {...args} />
    </Box>
  ),
  args: {
    number: "PR20220817A4DS",
    source: {
      id: "teleconsultation",
      name: "Chat Dokter",
    },
    updatedAt: "2022-06-27T12:22:29.226+07:00",
    createdAt: "2022-06-25T12:22:26.065+07:00",
    patientName: "Yuli Handayani Siregar, M.Psi, Psi",
    numberOfDrug: 5,
    status: "created",
  },
};

export const Mobile: MyPrescriptionCardStory = {
  render: (args) => (
    <Box width="328px">
      <MyPrescriptionCard {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
    source: {
      id: "user_upload",
      name: "Upload Resep",
    },
  },
};
