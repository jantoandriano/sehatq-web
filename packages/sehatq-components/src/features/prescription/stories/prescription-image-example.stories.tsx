import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { PrescriptionImageExample, PrescriptionImageExampleProps } from "..";

export default {
  title: "Features / Prescription / Prescription Image Example",
  component: PrescriptionImageExample,
} as Meta;

type PrescriptionImageExampleStory = StoryObj<PrescriptionImageExampleProps>;

export const Desktop: PrescriptionImageExampleStory = {
  render: (args) => (
    <Box width="730px">
      <PrescriptionImageExample {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionImageExampleStory = {
  render: (args) => (
    <Box width="360px">
      <PrescriptionImageExample {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
