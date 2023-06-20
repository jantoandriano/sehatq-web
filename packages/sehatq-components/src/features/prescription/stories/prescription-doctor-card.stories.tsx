import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { PrescriptionDoctorCard, PrescriptionDoctorCardProps } from "..";
import { generateGetPrescriptionRequest } from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Doctor Card",
  component: PrescriptionDoctorCard,
} as Meta;

type PrescriptionDoctorCardStory = StoryObj<PrescriptionDoctorCardProps>;

const PRESCRIPTION_NO = "PR2206VKAS5LA";

export const Desktop: PrescriptionDoctorCardStory = {
  render: (args) => (
    <Box width="730px">
      <PrescriptionDoctorCard {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest()],
    },
  },
};

export const Mobile: PrescriptionDoctorCardStory = {
  render: (args) => (
    <Box width="328px">
      <PrescriptionDoctorCard {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest()],
    },
  },
};
