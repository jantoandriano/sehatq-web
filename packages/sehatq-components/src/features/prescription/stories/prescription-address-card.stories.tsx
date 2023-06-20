import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { PrescriptionAddressCard, PrescriptionAddressCardProps } from "..";
import { generateGetPrescriptionRequest } from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Address Card",
  component: PrescriptionAddressCard,
} as Meta;

type PrescriptionAddressCardStory = StoryObj<PrescriptionAddressCardProps>;

const PRESCRIPTION_NO = "PR2206VKAS5LA";

export const Desktop: PrescriptionAddressCardStory = {
  render: (args) => (
    <Box width="730px">
      <PrescriptionAddressCard {...args} />
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

export const Mobile: PrescriptionAddressCardStory = {
  render: (args) => (
    <Box width="328px">
      <PrescriptionAddressCard {...args} />
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
