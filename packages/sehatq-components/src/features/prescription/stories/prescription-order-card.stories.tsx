import React from "react";
import { PartialDeep } from "type-fest";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PrescriptionOrderCard,
  PrescriptionOrderCardProps,
  PrescriptionResponse,
} from "..";
import { generateGetPrescriptionRequest } from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Order Card",
  component: PrescriptionOrderCard,
} as Meta;

type PrescriptionOrderCardStory = StoryObj<PrescriptionOrderCardProps>;

const PRESCRIPTION_NO = "PR2208EKCXOFN";
const previewCase: PartialDeep<PrescriptionResponse> = {
  data: {
    status: {
      id: "purchased",
      name: "Ditebus",
      activityMessage: "Resepmu sudah ditebus. Cepat sembuh ya!",
    },
  },
};

export const Desktop: PrescriptionOrderCardStory = {
  render: (args) => (
    <Box width="730px">
      <PrescriptionOrderCard {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase)],
    },
  },
};

export const Mobile: PrescriptionOrderCardStory = {
  render: (args) => (
    <Box width="328px">
      <PrescriptionOrderCard {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase)],
    },
  },
};
