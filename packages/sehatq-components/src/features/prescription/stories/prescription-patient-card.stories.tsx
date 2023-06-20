import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { PrescriptionPatientCard, PrescriptionPatientCardProps } from "..";
import { generateGetPrescriptionRequest } from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Patient Card",
  component: PrescriptionPatientCard,
} as Meta;

type PrescriptionPatientCardStory = StoryObj<PrescriptionPatientCardProps>;

const PRESCRIPTION_NO = "PR2206VKAS5LA";

export const Desktop: PrescriptionPatientCardStory = {
  render: (args) => (
    <Box width="730px">
      <PrescriptionPatientCard {...args} />
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

export const Mobile: PrescriptionPatientCardStory = {
  render: (args) => (
    <Box width="328px">
      <PrescriptionPatientCard {...args} />
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
