import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { GoToPrescriptionDetail, GoToPrescriptionDetailProps } from "..";
import { generateGetPrescriptionRequest } from "../msw-handlers";

export default {
  title: "Features / Prescription / Go To Prescription Detail",
  component: GoToPrescriptionDetail,
} as Meta;

type GoToPrescriptionDetailStory = StoryObj<GoToPrescriptionDetailProps>;

export const Desktop: GoToPrescriptionDetailStory = {
  render: (args) => (
    <Box width="320px">
      <GoToPrescriptionDetail {...args} />
    </Box>
  ),
  args: {
    consultationId: "15367",
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest()],
    },
  },
};

export const Mobile: GoToPrescriptionDetailStory = {
  render: (args) => (
    <Box width="296px">
      <GoToPrescriptionDetail {...args} />
    </Box>
  ),
  args: {
    consultationId: "15354",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest()],
    },
  },
};
