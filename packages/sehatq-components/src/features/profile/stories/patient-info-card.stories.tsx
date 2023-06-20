import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { PatientInfoCard, PatientInfoCardProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Patient Info Card",
  component: PatientInfoCard,
} as Meta;

type PatientInfoCardStory = StoryObj<PatientInfoCardProps>;

export const Desktop: PatientInfoCardStory = {
  render: (args) => (
    <Box width="720px">
      <PatientInfoCard {...args} />
    </Box>
  ),
  args: {
    bookingId: "PRQ0001",
    createdAt: "19 Mar, 09.15",
    status: {
      id: "checked-in",
      label: "Mendaftar",
      color: "sea",
    },
    patientName: "Nicole Rania",
    patientDob: "20 November 1987",
    patientAddress:
      "Jl. M.H. Thamrin No.51, RT.9/RW.4, Gondangdia, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10350",
    patientPhone: "08170100009",
  },
};

export const Mobile: PatientInfoCardStory = {
  render: (args) => (
    <Box width="328px">
      <PatientInfoCard {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
    status: { id: "new", label: "Baru", color: "squash" },
  },
};
