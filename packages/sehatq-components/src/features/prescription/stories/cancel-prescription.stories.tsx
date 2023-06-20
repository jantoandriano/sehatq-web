import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { CancelPrescription, CancelPrescriptionProps } from "..";

export default {
  title: "Features / Prescription / Cancel Prescription",
  component: CancelPrescription,
} as Meta;

type CancelPrescriptionStory = StoryObj<CancelPrescriptionProps>;

const PRESCRIPTION_NO = "PR2206VKAS5LA";

export const Desktop: CancelPrescriptionStory = {
  render: (args) => <CancelPrescription {...args} />,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
};

export const Mobile: CancelPrescriptionStory = {
  render: (args) => <CancelPrescription {...args} />,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
};
