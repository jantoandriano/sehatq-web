import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { PrescriptionImagesPopup, PrescriptionImagesPopupProps } from "..";
import {
  generateGetPrescriptionRequest,
  generateGetPrescriptionProducts,
} from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Images Popup",
  component: PrescriptionImagesPopup,
} as Meta;

type PrescriptionImagesPopupStory = StoryObj<PrescriptionImagesPopupProps>;

const PRESCRIPTION_NO = "PR2206VKAS5LA";

export const Desktop: PrescriptionImagesPopupStory = {
  render: (args) => (
    <Box width="730px">
      <PrescriptionImagesPopup {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const Mobile: PrescriptionImagesPopupStory = {
  render: (args) => (
    <Box width="328px">
      <PrescriptionImagesPopup {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionProducts,
      ],
    },
  },
};
