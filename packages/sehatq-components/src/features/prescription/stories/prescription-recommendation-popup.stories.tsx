import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PrescriptionRecommendationPopup,
  PrescriptionRecommendationPopupProps,
} from "..";
import {
  generateGetPrescriptionRequest,
  generateGetPrescriptionProducts,
} from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Recommendation Popup",
  component: PrescriptionRecommendationPopup,
} as Meta;

type PrescriptionRecommendationPopupStory =
  StoryObj<PrescriptionRecommendationPopupProps>;

const PRESCRIPTION_NO = "PR2206VKAS5LA";

export const Desktop: PrescriptionRecommendationPopupStory = {
  render: (args) => (
    <Box width="730px">
      <PrescriptionRecommendationPopup {...args} />
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

export const Mobile: PrescriptionRecommendationPopupStory = {
  render: (args) => (
    <Box width="328px">
      <PrescriptionRecommendationPopup {...args} />
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
