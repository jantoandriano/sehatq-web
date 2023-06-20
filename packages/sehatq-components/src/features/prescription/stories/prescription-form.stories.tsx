import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { PrescriptionForm, PrescriptionFormProps } from "..";

export default {
  title: "Features / Prescription / Prescription Form",
  component: PrescriptionForm,
} as Meta;

type PrescriptionFormStory = StoryObj<PrescriptionFormProps>;

export const Desktop: PrescriptionFormStory = {
  render: (args) => (
    <Box width="760px">
      <PrescriptionForm {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionFormStory = {
  render: (args) => (
    <Box width="360px">
      <PrescriptionForm {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
